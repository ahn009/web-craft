#!/bin/bash
# =============================================================================
# API Test Script for AI Agent Marketplace
# Tests all endpoints: public, auth, protected, and edge cases
# =============================================================================

BASE_URL="${BASE_URL:-http://localhost:3000}"
PASS=0
FAIL=0
TOTAL=0
TOKEN=""
AGENT_ID=""
USER_EMAIL="testrunner_$(date +%s)@example.com"
USER_PASSWORD="SecurePass123"
USER_NAME="Test Runner"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

assert_contains() {
  local test_name="$1"
  local response="$2"
  local expected="$3"
  TOTAL=$((TOTAL + 1))
  if echo "$response" | grep -q "$expected"; then
    PASS=$((PASS + 1))
    echo -e "  ${GREEN}PASS${NC} $test_name"
  else
    FAIL=$((FAIL + 1))
    echo -e "  ${RED}FAIL${NC} $test_name"
    echo -e "       Expected to contain: ${expected}"
    echo -e "       Got: ${response:0:200}"
  fi
}

assert_status() {
  local test_name="$1"
  local actual="$2"
  local expected="$3"
  TOTAL=$((TOTAL + 1))
  if [ "$actual" = "$expected" ]; then
    PASS=$((PASS + 1))
    echo -e "  ${GREEN}PASS${NC} $test_name (HTTP $actual)"
  else
    FAIL=$((FAIL + 1))
    echo -e "  ${RED}FAIL${NC} $test_name (Expected HTTP $expected, got $actual)"
  fi
}

echo -e "${CYAN}=============================================${NC}"
echo -e "${CYAN} AI Agent Marketplace - API Test Suite${NC}"
echo -e "${CYAN}=============================================${NC}"
echo -e "Base URL: $BASE_URL"
echo -e "Test user: $USER_EMAIL"
echo ""

# -----------------------------------------------
echo -e "${YELLOW}[1/6] Health & Database Check${NC}"
# -----------------------------------------------

RESP=$(curl -s "$BASE_URL/health")
assert_contains "Health endpoint returns ok" "$RESP" '"status":"ok"'

# -----------------------------------------------
echo ""
echo -e "${YELLOW}[2/6] Public Endpoints${NC}"
# -----------------------------------------------

# GET /api/agents with pagination
RESP=$(curl -s "$BASE_URL/api/agents?page=1&limit=5")
assert_contains "Agents list returns success" "$RESP" '"success":true'
assert_contains "Agents list has pagination" "$RESP" '"pagination"'
assert_contains "Agents list has agents array" "$RESP" '"agents"'

# Extract first agent ID for later tests
AGENT_ID=$(echo "$RESP" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['data']['agents'][0]['id'])" 2>/dev/null)
if [ -z "$AGENT_ID" ]; then
  echo -e "  ${RED}FAIL${NC} Could not extract agent ID - aborting"
  exit 1
fi
echo -e "  ${CYAN}INFO${NC} Using agent ID: $AGENT_ID"

# GET /api/agents/categories
RESP=$(curl -s "$BASE_URL/api/agents/categories")
assert_contains "Categories returns success" "$RESP" '"success":true'

# GET /api/agents/:id
RESP=$(curl -s "$BASE_URL/api/agents/$AGENT_ID")
assert_contains "Agent detail returns success" "$RESP" '"success":true'
assert_contains "Agent detail includes rawJson" "$RESP" '"rawJson"'

# GET /api/agents with search
RESP=$(curl -s "$BASE_URL/api/agents?search=webhook&limit=3")
assert_contains "Search filter works" "$RESP" '"success":true'

# GET /api/agents with category filter
RESP=$(curl -s "$BASE_URL/api/agents?category=AI&limit=3")
assert_contains "Category filter works" "$RESP" '"success":true'

# GET /api/agents with sort
RESP=$(curl -s "$BASE_URL/api/agents?sort=price_asc&limit=3")
assert_contains "Sort by price works" "$RESP" '"success":true'

# POST /api/agents/:id/test
RESP=$(curl -s -X POST "$BASE_URL/api/agents/$AGENT_ID/test")
assert_contains "Test simulation returns success" "$RESP" '"success":true'
assert_contains "Test simulation has steps" "$RESP" '"steps"'
assert_contains "Test simulation status completed" "$RESP" '"status":"completed"'

# -----------------------------------------------
echo ""
echo -e "${YELLOW}[3/6] Auth Endpoints${NC}"
# -----------------------------------------------

# POST /api/auth/register
RESP=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H 'Content-Type: application/json' \
  -d "{\"email\":\"$USER_EMAIL\",\"password\":\"$USER_PASSWORD\",\"name\":\"$USER_NAME\"}")
assert_contains "Register returns success" "$RESP" '"success":true'
assert_contains "Register returns token" "$RESP" '"token"'

# POST /api/auth/login
RESP=$(curl -s -X POST "$BASE_URL/api/auth/login" \
  -H 'Content-Type: application/json' \
  -d "{\"email\":\"$USER_EMAIL\",\"password\":\"$USER_PASSWORD\"}")
assert_contains "Login returns success" "$RESP" '"success":true'
assert_contains "Login returns token" "$RESP" '"token"'

TOKEN=$(echo "$RESP" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['data']['token'])" 2>/dev/null)
if [ -z "$TOKEN" ]; then
  echo -e "  ${RED}FAIL${NC} Could not extract JWT token - aborting protected tests"
  exit 1
fi
echo -e "  ${CYAN}INFO${NC} JWT token obtained: ${TOKEN:0:30}..."

# -----------------------------------------------
echo ""
echo -e "${YELLOW}[4/6] Protected Endpoints${NC}"
# -----------------------------------------------

# POST /api/checkout/:agentId
RESP=$(curl -s -X POST "$BASE_URL/api/checkout/$AGENT_ID" \
  -H "Authorization: Bearer $TOKEN")
assert_contains "Checkout returns success" "$RESP" '"success":true'
assert_contains "Checkout returns purchase" "$RESP" '"purchase"'
assert_contains "Checkout has success message" "$RESP" '"Purchase successful'

# GET /api/my-agents
RESP=$(curl -s "$BASE_URL/api/my-agents" \
  -H "Authorization: Bearer $TOKEN")
assert_contains "My-agents returns success" "$RESP" '"success":true'
assert_contains "My-agents includes purchased agent" "$RESP" "$AGENT_ID"

# GET /api/agents/:id/download
STATUS=$(curl -s -o /tmp/agent_download.json -w "%{http_code}" "$BASE_URL/api/agents/$AGENT_ID/download" \
  -H "Authorization: Bearer $TOKEN")
assert_status "Download returns 200" "$STATUS" "200"
RESP=$(cat /tmp/agent_download.json)
assert_contains "Downloaded JSON has nodes" "$RESP" '"nodes"'
assert_contains "Downloaded JSON is valid n8n workflow" "$RESP" '"connections"'

# -----------------------------------------------
echo ""
echo -e "${YELLOW}[5/6] Error Handling & Edge Cases${NC}"
# -----------------------------------------------

# Invalid login
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/api/auth/login" \
  -H 'Content-Type: application/json' \
  -d '{"email":"wrong@example.com","password":"wrong"}')
assert_status "Invalid login returns 401" "$STATUS" "401"

# Purchase without auth
RESP=$(curl -s -X POST "$BASE_URL/api/checkout/$AGENT_ID")
assert_contains "Purchase without auth is rejected" "$RESP" '"Unauthorized"'

# Duplicate purchase
RESP=$(curl -s -X POST "$BASE_URL/api/checkout/$AGENT_ID" \
  -H "Authorization: Bearer $TOKEN")
assert_contains "Duplicate purchase is rejected" "$RESP" '"Already purchased"'

# Download without purchase (use a different agent)
SECOND_AGENT=$(curl -s "$BASE_URL/api/agents?page=2&limit=1" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['data']['agents'][0]['id'])" 2>/dev/null)
if [ -n "$SECOND_AGENT" ]; then
  RESP=$(curl -s "$BASE_URL/api/agents/$SECOND_AGENT/download" \
    -H "Authorization: Bearer $TOKEN")
  assert_contains "Download without purchase is rejected" "$RESP" 'must purchase'
fi

# Invalid agent ID
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/api/agents/nonexistent-id-123")
assert_status "Invalid agent ID returns 404" "$STATUS" "404"

# Pagination boundary
RESP=$(curl -s "$BASE_URL/api/agents?page=99999&limit=10")
AGENT_COUNT=$(echo "$RESP" | python3 -c "import sys,json; d=json.load(sys.stdin); print(len(d['data']['agents']))" 2>/dev/null)
TOTAL=$((TOTAL + 1))
if [ "$AGENT_COUNT" = "0" ]; then
  PASS=$((PASS + 1))
  echo -e "  ${GREEN}PASS${NC} Empty page returns 0 agents"
else
  FAIL=$((FAIL + 1))
  echo -e "  ${RED}FAIL${NC} Empty page should return 0 agents (got $AGENT_COUNT)"
fi

# Missing required fields in registration
RESP=$(curl -s -X POST "$BASE_URL/api/auth/register" \
  -H 'Content-Type: application/json' \
  -d '{"email":"incomplete@example.com"}')
assert_contains "Missing fields rejected" "$RESP" 'error'

# -----------------------------------------------
echo ""
echo -e "${YELLOW}[6/6] CORS Verification${NC}"
# -----------------------------------------------

CORS_HEADERS=$(curl -sv -X OPTIONS "$BASE_URL/api/agents" \
  -H "Origin: http://localhost:5173" \
  -H "Access-Control-Request-Method: GET" 2>&1)

TOTAL=$((TOTAL + 1))
if echo "$CORS_HEADERS" | grep -q "access-control-allow-origin: http://localhost:5173"; then
  PASS=$((PASS + 1))
  echo -e "  ${GREEN}PASS${NC} CORS allows frontend origin"
else
  FAIL=$((FAIL + 1))
  echo -e "  ${RED}FAIL${NC} CORS does not allow frontend origin"
fi

TOTAL=$((TOTAL + 1))
if echo "$CORS_HEADERS" | grep -q "access-control-allow-credentials: true"; then
  PASS=$((PASS + 1))
  echo -e "  ${GREEN}PASS${NC} CORS allows credentials"
else
  FAIL=$((FAIL + 1))
  echo -e "  ${RED}FAIL${NC} CORS does not allow credentials"
fi

# -----------------------------------------------
echo ""
echo -e "${CYAN}=============================================${NC}"
echo -e "${CYAN} Test Results${NC}"
echo -e "${CYAN}=============================================${NC}"
echo -e "  Total:  $TOTAL"
echo -e "  ${GREEN}Passed: $PASS${NC}"
echo -e "  ${RED}Failed: $FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
  echo -e "${GREEN}All tests passed!${NC}"
  exit 0
else
  echo -e "${RED}Some tests failed. Check output above.${NC}"
  exit 1
fi

import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, ChevronLeft, ChevronRight, Tag, Layers, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchAgents, fetchCategories } from '@/services/api';
import type { MarketplaceAgent, PaginationInfo } from '@/services/api';

export default function MarketplacePage() {
  const [agents, setAgents] = useState<MarketplaceAgent[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState<'newest' | 'price_asc' | 'price_desc' | 'name_asc'>('newest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadAgents = useCallback(async (page: number) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchAgents({
        page,
        limit: 20,
        search: searchQuery || undefined,
        category: selectedCategory || undefined,
        sort,
      });
      setAgents(data.agents);
      setPagination(data.pagination);
    } catch (err) {
      setError('Failed to load agents. Make sure the backend is running on localhost:3000.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory, sort]);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => {});
  }, []);

  useEffect(() => {
    loadAgents(1);
  }, [loadAgents]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Background */}
      <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Agent <span className="gradient-text">Marketplace</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse {pagination.total > 0 ? `${pagination.total.toLocaleString()}+` : ''} real AI agents built from n8n workflows. Ready to deploy.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search agents by name or description..."
                className="w-full pl-12 pr-4 py-3 bg-secondary/50 border border-border rounded-xl text-sm focus:outline-none focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 transition-all"
              />
            </div>
            <Button type="submit" className="bg-gradient-to-r from-cyan to-cyan-600 text-navy-900 font-semibold px-6 rounded-xl">
              Search
            </Button>
          </form>

          {/* Filter row */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span>Filter:</span>
            </div>

            {/* Category filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:border-cyan/50 transition-all"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="px-4 py-2 bg-secondary/50 border border-border rounded-lg text-sm focus:outline-none focus:border-cyan/50 transition-all"
            >
              <option value="newest">Newest First</option>
              <option value="name_asc">Name A-Z</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>

            {(selectedCategory || searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategory('');
                  setSearchQuery('');
                  setSearchInput('');
                }}
                className="text-cyan hover:text-cyan-400"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </motion.div>

        {/* Error state */}
        {error && (
          <div className="text-center py-16">
            <p className="text-red-400 mb-4">{error}</p>
            <Button onClick={() => loadAgents(1)} variant="outline" className="border-cyan/30">
              Retry
            </Button>
          </div>
        )}

        {/* Loading state */}
        {loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 rounded-xl bg-secondary/30 animate-pulse border border-border/50" />
            ))}
          </div>
        )}

        {/* Agent Grid */}
        {!loading && !error && (
          <>
            {agents.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No agents found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {agents.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <Link to={`/marketplace/${agent.id}`}>
                      <div className="group relative h-full p-5 rounded-xl bg-secondary/30 border border-border/50 hover:border-cyan/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan/5">
                        {/* Gradient hover overlay */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan/5 to-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative">
                          {/* Category badge */}
                          <div className="flex items-center justify-between mb-3">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan/10 text-xs text-cyan font-medium">
                              <Layers className="w-3 h-3" />
                              {agent.category}
                            </span>
                            <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
                              <DollarSign className="w-3.5 h-3.5" />
                              {agent.price === 0 ? 'Free' : agent.price.toFixed(2)}
                            </span>
                          </div>

                          {/* Name */}
                          <h3 className="text-base font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-cyan transition-colors">
                            {agent.name}
                          </h3>

                          {/* Description */}
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {agent.description || 'An AI agent built from n8n workflow.'}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {agent.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple/10 text-xs text-purple"
                              >
                                <Tag className="w-2.5 h-2.5" />
                                {tag}
                              </span>
                            ))}
                            {agent.tags.length > 3 && (
                              <span className="text-xs text-muted-foreground">+{agent.tags.length - 3}</span>
                            )}
                          </div>

                          {/* Node count */}
                          <div className="text-xs text-muted-foreground">
                            {agent.nodeCount} nodes
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page <= 1}
                  onClick={() => loadAgents(pagination.page - 1)}
                  className="border-cyan/30 hover:bg-cyan/10"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>

                <span className="text-sm text-muted-foreground">
                  Page {pagination.page} of {pagination.totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => loadAgents(pagination.page + 1)}
                  className="border-cyan/30 hover:bg-cyan/10"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

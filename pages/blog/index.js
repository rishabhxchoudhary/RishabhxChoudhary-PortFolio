// pages/blog/index.js
import React, { useEffect, useState, useMemo } from 'react'; // Import useMemo
import Layout from '../../components/blog/Layout';
import PostCard from '../../components/blog/PostCard';
import { getSortedPostsData } from '../../lib/posts';
import { parse } from 'date-fns';
import { useRouter } from 'next/router';
import {
  Chip,
  Dropdown,
  Button,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
  Input,
} from '@nextui-org/react';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { IoClose } from "react-icons/io5";
import { Transition } from '@headlessui/react';
import { FaFilter } from "react-icons/fa";

const Blog = ({ allPosts }) => {
  const router = useRouter();
  const { search, category, tags, sort } = router.query;
  console.log("sort", sort)

  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const [searchTerm, setSearchTerm] = useState(search || '');
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to toggle sidebar

  // Extract unique categories and tags
  const categories = useMemo(() => [...new Set(allPosts.map((post) => post.category))], [allPosts]);
  const tagsList = useMemo(() => [...new Set(allPosts.flatMap((post) => post.tags))], [allPosts]);

  useEffect(() => {
    let filtered = allPosts;

    // Search Filter
    if (searchTerm) {
      const searchQuery = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery) ||
          post.about.toLowerCase().includes(searchQuery) ||
          post.tags.some((tag) => tag.toLowerCase().includes(searchQuery)) ||
          post.category.toLowerCase().includes(searchQuery)
      );
    }

    // Category Filter
    if (category) {
      filtered = filtered.filter((post) => post.category === category);
    }

    // Tags Filter
    if (tags) {
      const selectedTags = Array.isArray(tags) ? tags : [tags];
      filtered = filtered.filter((post) =>
        selectedTags.every((tag) => post.tags.includes(tag))
      );
    }

    const parseDateString = (dateString) => parse(dateString, 'd MMMM yyyy', new Date());

      if (sort !== 'oldest') {
        filtered = filtered.sort(
          (a, b) => parseDateString(b.date) - parseDateString(a.date)
        );
      } else {
        filtered = filtered.sort(
          (a, b) => parseDateString(a.date) - parseDateString(b.date)
        );
      }

    setFilteredPosts(filtered);
  }, [searchTerm, category, tags, sort, allPosts]);

  // Handlers for Category Selection
  const handleCategorySelect = (key) => {
    const selectedCategory = key === 'all' ? undefined : key;
    router.push({
      pathname: '/blog',
      query: {
        ...router.query,
        category: selectedCategory,
      },
    });
  };

  // Handlers for Sorting Selection
  const handleSortSelect = (key) => {
    const selectedSort = key === 'newest' ? undefined : key;
    router.push({
      pathname: '/blog',
      query: {
        ...router.query,
        sort: selectedSort,
      },
    });
  };

  // Handlers for Tags using Chips
  const handleTagRemove = (removedTag) => {
    let updatedTags = Array.isArray(tags) ? [...tags] : tags ? [tags] : [];
    updatedTags = updatedTags.filter((tag) => tag !== removedTag);
    router.push({
      pathname: '/blog',
      query: {
        ...router.query,
        tags: updatedTags.length > 0 ? updatedTags : undefined,
      },
    });
  };

  const handleTagAdd = (addedTag) => {
    let updatedTags = Array.isArray(tags) ? [...tags] : tags ? [tags] : [];
    if (!updatedTags.includes(addedTag)) {
      updatedTags.push(addedTag);
      router.push({
        pathname: '/blog',
        query: {
          ...router.query,
          tags: updatedTags,
        },
      });
    }
  };

  // Available Tags for Dropdown (exclude already selected tags and ensure they are present in filteredPosts)
  const availableTags = useMemo(() => {
    return tagsList.filter(
      (tag) =>
        !(Array.isArray(tags) ? tags.includes(tag) : tags === tag) &&
        filteredPosts.some((post) => post.tags.includes(tag))
    );
  }, [tagsList, tags, filteredPosts]);

  // Handle Search Submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    router.push({
      pathname: '/blog',
      query: {
        ...router.query,
        search: searchTerm || undefined,
      },
    });
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        {/* Toggle Filter Button for Mobile */}
        <div className="md:hidden p-4 bg-background-dark flex justify-between items-center">
          <h2 className="text-xl font-semibold text-text-light">Filters</h2>
          {/* <Button
            auto
            light
            icon={<FunnelIcon />}
            onClick={() => setIsFilterOpen(true)}
            aria-label="Open Filters"
          /> */}
          <Button isIconOnly color="default" aria-label="Open Filters" onClick={() => setIsFilterOpen(true)}>
            <FaFilter />
          </Button>  
        </div>

        {/* Sidebar for Filters (Mobile) */}
        <Transition show={isFilterOpen} as={React.Fragment}>
          <div className="fixed inset-0 z-40 md:hidden">
            <Transition.Child
              as={React.Fragment}
              enter="transition-opacity duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={() => setIsFilterOpen(false)}
              ></div>
            </Transition.Child>

            <Transition.Child
              as={React.Fragment}
              enter="transition-transform duration-300"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition-transform duration-300"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <aside className="fixed inset-y-0 left-0 w-3/4 bg-background-dark text-text p-6 overflow-y-auto scrollbar-custom">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-text-light">Filters</h2>
                   <Button isIconOnly color="default" aria-label="Open Filters" onClick={() => setIsFilterOpen(false)}>
                    <IoClose />
                  </Button>  
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearchSubmit} className="mb-6">
                  <Input
                    clearable
                    underlined
                    fullWidth
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Search"
                  />
                </form>

                {/* Category Filter */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4 text-text-light">Category</h3>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        auto
                        flat
                        iconRight={<ChevronDownIcon />}
                        className="w-full text-left "
                      >
                        {category || 'All Categories'}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Category Dropdown"
                      onAction={handleCategorySelect}
                    >
                      <DropdownItem key="all">All</DropdownItem>
                      {categories.map((cat) => (
                        <DropdownItem key={cat}>{cat}</DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>

                {/* Tags Filter */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4 text-text-light">Tags</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(Array.isArray(tags) ? tags : tags ? [tags] : []).map(
                      (tag, index) => (
                        <Chip
                          key={index}
                          onClose={() => handleTagRemove(tag)}
                          variant="flat"
                          color="primary"
                          className="text-text-default"
                        >
                          {tag}
                        </Chip>
                      )
                    )}
                  </div>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        auto
                        flat
                        disabled={availableTags.length === 0}
                        className="w-full text-left "
                        aria-label="Add Tag"
                      >
                        Add Tag
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Add Tag Dropdown"
                      onAction={(key) => handleTagAdd(key)}
                      disabledKeys={["no_more"]}
                    >
                      {availableTags.length > 0 ? (
                        availableTags.map((tag) => (
                          <DropdownItem key={tag}>{tag}</DropdownItem>
                        ))
                      ) : (
                        <DropdownItem key={"no_more"} disabled>No more tags</DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                </div>

                {/* Sorting Filter */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4 text-text-light">Sort By</h3>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        auto
                        flat
                        iconRight={<ChevronDownIcon />}
                        className="w-full text-left "
                      >
                        {sort === 'oldest' ? 'Oldest First' : 'Newest First'}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Sort Dropdown"
                      onAction={handleSortSelect}
                    >
                      <DropdownItem key="newest">Date (Newest First)</DropdownItem>
                      <DropdownItem key="oldest">Date (Oldest First)</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </aside>
            </Transition.Child>
          </div>
        </Transition>

        {/* Sidebar for Desktop */}
        <aside className="hidden md:block md:w-1/4 p-6 bg-background-dark text-text scrollbar-custom">
          <h2 className="text-2xl font-semibold mb-6 text-text-light">Filters</h2>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="mb-8">
            <Input
              clearable
              underlined
              fullWidth
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search"
            />
          </form>

          {/* Category Filter */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 text-text-light">Category</h3>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  auto
                  flat
                  iconRight={<ChevronDownIcon />}
                  className="w-full text-left "
                >
                  {category || 'All Categories'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Category Dropdown"
                onAction={handleCategorySelect}
              >
                <DropdownItem key="all">All</DropdownItem>
                {categories.map((cat) => (
                  <DropdownItem key={cat}>{cat}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Tags Filter */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 text-text-light">Tags</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {(Array.isArray(tags) ? tags : tags ? [tags] : []).map(
                (tag, index) => (
                  <Chip
                    key={index}
                    onClose={() => handleTagRemove(tag)}
                    variant="flat"
                    color="primary"
                    className="text-text-default"
                  >
                    {tag}
                  </Chip>
                )
              )}
            </div>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  auto
                  flat
                  disabled={availableTags.length === 0}
                  className="w-full text-left "
                  aria-label="Add Tag"
                >
                  Add Tag
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Add Tag Dropdown"
                onAction={(key) => handleTagAdd(key)}
                disabledKeys={["no_more"]}
              >
                {availableTags.length > 0 ? (
                  availableTags.map((tag) => (
                    <DropdownItem key={tag}>{tag}</DropdownItem>
                  ))
                ) : (
                  <DropdownItem key={"no_more"} disabled>No more tags</DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>

          {/* Sorting Filter */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 text-text-light">Sort By</h3>
            <Dropdown>
              <DropdownTrigger>
                <Button
                  auto
                  flat
                  iconRight={<ChevronDownIcon />}
                  className="w-full text-left "
                >
                  {sort === 'oldest' ? 'Oldest First' : 'Newest First'}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Sort Dropdown"
                onAction={handleSortSelect}
              >
                <DropdownItem key="newest">Date (Newest First)</DropdownItem>
                <DropdownItem key="oldest">Date (Oldest First)</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </aside>

        {/* Main Content for Blog Posts */}
        <main className="w-full md:w-3/4 p-6 scrollbar-custom">
          {filteredPosts ? filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))
          ) : (
            <p className="text-center text-text-dark">No posts found.</p>
          ) : <>
          <p className="text-center text-text-dark">Loading Posts</p>
          </>}
        </main>
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const allPosts = getSortedPostsData();
  return {
    props: {
      allPosts,
    },
  };
}

export default Blog;

// pages/blog/index.js
import Layout from '../../components/blog/Layout';
import PostCard from '../../components/blog/PostCard';
import { getSortedPostsData } from '../../lib/posts';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Chip,
  Dropdown,
  Button,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from '@nextui-org/react';

const Blog = ({ allPosts }) => {
  const router = useRouter();
  const { search, category, tags, sort } = router.query;

  const [filteredPosts, setFilteredPosts] = useState(allPosts);

  // Extract unique categories and tags
  const categories = [...new Set(allPosts.map((post) => post.category))];
  const tagsList = [...new Set(allPosts.flatMap((post) => post.tags))];

  useEffect(() => {
    let filtered = allPosts;

    // Search Filter
    if (search) {
      const searchQuery = search.toLowerCase();
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

    // Sorting
    if (sort) {
      if (sort === 'newest') {
        filtered = filtered.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
      } else if (sort === 'oldest') {
        filtered = filtered.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
      }
    }

    setFilteredPosts(filtered);
  }, [search, category, tags, sort, allPosts]);

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

  // Available Tags for Dropdown (exclude already selected tags)
  const availableTags = tagsList.filter(
    (tag) => !(Array.isArray(tags) ? tags.includes(tag) : tags === tag)
  );

  return (
    <Layout>
      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
        {/* Category Filter using Dropdown */}
        <div>
          <Dropdown>
            <DropdownTrigger>
              <Button auto flat>
                {category || 'Select Category'}
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

        {/* Tags Filter using Dropdown and Chips */}
        <div className="flex flex-col">
          {/* Display Selected Tags as Chips */}
          <div className="flex items-center flex-wrap gap-2 mb-2">
            {(Array.isArray(tags) ? tags : tags ? [tags] : []).map(
              (tag, index) => (
                <Chip
                  key={index}
                  onClose={() => handleTagRemove(tag)}
                  variant="flat"
                  color="primary"
                >
                  {tag}
                </Chip>
              )
            )}
          </div>
          {/* Dropdown to Add Tags */}
          <div>
            <Dropdown>
              <DropdownTrigger>
                <Button auto flat>
                  Add Tag
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Add Tag Dropdown"
                onAction={(key) => handleTagAdd(key)}
              >
                {availableTags.length > 0 ? (
                  availableTags.map((tag) => (
                    <DropdownItem key={tag}>{tag}</DropdownItem>
                  ))
                ) : (
                  <DropdownItem disabled>No more tags</DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        {/* Sorting using Dropdown */}
        <div>
          <Dropdown>
            <DropdownTrigger>
              <Button auto flat>
                Sort: {sort === 'oldest' ? 'Oldest First' : 'Newest First'}
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
      </div>

      {/* Display Selected Tags as Chips */}
      {/* (If you prefer to have the selected tags displayed separately, you can keep them here.
          However, in this implementation, selected tags are already displayed above.) */}

      {/* Display Filtered Posts */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
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

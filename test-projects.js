// Test script to verify project restriction functionality
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function testProjectRestrictions() {
  console.log('Testing AI Project Restrictions...\n');

  const testCases = [
    {
      name: 'Initial project inquiry',
      message: 'Can you show me your projects?'
    },
    {
      name: 'Ask for more projects (first time)',
      message: 'any other projects you have worked on?'
    },
    {
      name: 'Ask for more projects (second time)',
      message: 'any other?'
    },
    {
      name: 'Ask for more projects (third time)',
      message: 'any other?'
    },
    {
      name: 'Ask for GitHub links of fake projects',
      message: 'give me github links of the above 3'
    },
    {
      name: 'Ask about specific real project',
      message: 'tell me about ShopWise'
    },
    {
      name: 'Ask about React projects',
      message: 'what projects have you built with React?'
    }
  ];

  let conversationHistory = [];

  for (const testCase of testCases) {
    console.log(`\n=== ${testCase.name} ===`);
    console.log(`User: ${testCase.message}`);

    try {
      const response = await fetch(`${BASE_URL}/api/rishabhAi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: testCase.message,
          conversationHistory: conversationHistory
        })
      });

      if (!response.ok) {
        console.log(`Error: ${response.status} ${response.statusText}`);
        continue;
      }

      const data = await response.json();
      console.log(`AI: ${data.message}`);

      // Update conversation history
      conversationHistory.push({
        role: 'user',
        content: testCase.message
      });
      conversationHistory.push({
        role: 'assistant',
        content: data.message
      });

      // Check for hallucinated projects
      const suspiciousPatterns = [
        /Project Management Tool/i,
        /Real-time Chat Application/i,
        /Personal Finance Tracker/i,
        /Weather Dashboard/i,
        /Blog Platform/i,
        /Recipe Sharing Platform/i,
        /Task Management System/i,
        /Online Learning Platform/i,
        /Social Media Clone/i,
        /E-commerce Website/i
      ];

      const foundHallucinations = suspiciousPatterns.filter(pattern =>
        pattern.test(data.message)
      );

      if (foundHallucinations.length > 0) {
        console.log(`❌ HALLUCINATION DETECTED: Found ${foundHallucinations.length} fake projects`);
      } else {
        console.log(`✅ No hallucinations detected`);
      }

      // Check if providing fake GitHub links
      if (testCase.message.includes('github links') && data.message.includes('github.com')) {
        const fakeRepoPatterns = [
          /online-learning-platform/i,
          /social-media-clone/i,
          /e-commerce-website/i
        ];

        const foundFakeLinks = fakeRepoPatterns.filter(pattern =>
          pattern.test(data.message)
        );

        if (foundFakeLinks.length > 0) {
          console.log(`❌ FAKE GITHUB LINKS DETECTED: ${foundFakeLinks.length} fake repositories`);
        } else {
          console.log(`✅ No fake GitHub links detected`);
        }
      }

      // Wait a bit between requests
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  }

  // Test real project data fetching
  console.log('\n=== Testing GitHub API directly ===');
  try {
    const githubResponse = await fetch(`${BASE_URL}/api/github-projects`);
    if (githubResponse.ok) {
      const githubData = await githubResponse.json();
      console.log(`✅ GitHub API working: ${githubData.projects.length} real projects found`);
      console.log('Real projects:', githubData.projects.map(p => p.title).join(', '));
    } else {
      console.log(`❌ GitHub API error: ${githubResponse.status}`);
    }
  } catch (error) {
    console.log(`❌ GitHub API error: ${error.message}`);
  }
}

// Run the tests
if (require.main === module) {
  testProjectRestrictions().catch(console.error);
}

module.exports = { testProjectRestrictions };

// StarCounter Pro - Main Application Logic

const API_BASE = 'https://api.github.com';
let currentUser = null;

// DOM Elements
const analyzeBtn = document.getElementById('analyzeBtn');
const usernameInput = document.getElementById('usernameInput');
const dashboard = document.getElementById('dashboard');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const searchSection = document.getElementById('searchSection');

// Event Listeners
analyzeBtn.addEventListener('click', () => analyzeProfile());
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') analyzeProfile();
});

// Main Analysis Function
async function analyzeProfile() {
    const username = usernameInput.value.trim();
    
    if (!username) {
        showError('Please enter a GitHub username');
        return;
    }

    // Show loading state
    dashboard.classList.add('hidden');
    error.classList.add('hidden');
    loading.classList.remove('hidden');

    try {
        // Fetch user data
        const userData = await fetchGitHubUser(username);
        const repos = await fetchUserRepos(username);
        
        // Calculate stats
        const stats = calculateStats(userData, repos);
        
        // Store current user
        currentUser = { userData, repos, stats };
        
        // Display dashboard
        displayDashboard(userData, repos, stats);
        
        // Hide loading
        loading.classList.add('hidden');
        dashboard.classList.remove('hidden');
        
    } catch (err) {
        loading.classList.add('hidden');
        showError(err.message || 'Failed to fetch GitHub data. Please try again.');
    }
}

// Fetch GitHub User
async function fetchGitHubUser(username) {
    const response = await fetch(`${API_BASE}/users/${username}`);
    
    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('User not found. Please check the username.');
        }
        throw new Error('Failed to fetch user data');
    }
    
    return await response.json();
}

// Fetch User Repositories
async function fetchUserRepos(username) {
    let allRepos = [];
    let page = 1;
    let hasMore = true;
    
    while (hasMore) {
        const response = await fetch(`${API_BASE}/users/${username}/repos?per_page=100&page=${page}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }
        
        const repos = await response.json();
        
        if (repos.length === 0) {
            hasMore = false;
        } else {
            allRepos = allRepos.concat(repos);
            page++;
        }
        
        // Safety limit
        if (page > 10) break;
    }
    
    // Filter out forked repos for more accurate stats
    return allRepos.filter(repo => !repo.fork);
}

// Calculate Statistics
function calculateStats(userData, repos) {
    // Total stars across all repos
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    
    // Sort repos by stars
    const topRepos = [...repos]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10);
    
    // Language distribution
    const languages = {};
    repos.forEach(repo => {
        if (repo.language) {
            languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
    });
    
    // Quality score (average stars per repo)
    const qualityScore = repos.length > 0 ? (totalStars / repos.length).toFixed(1) : 0;
    
    // Impact score (followers to stars ratio)
    const impactScore = totalStars > 0 ? (userData.followers / totalStars * 100).toFixed(1) : 0;
    
    // Growth trend (simplified - in real version would use historical data)
    const growthTrend = calculateGrowthTrend(repos);
    
    return {
        totalStars,
        topRepos,
        languages,
        qualityScore,
        impactScore,
        growthTrend
    };
}

// Calculate Growth Trend (Simplified)
function calculateGrowthTrend(repos) {
    // Calculate based on recent repo activity
    const now = new Date();
    const recentRepos = repos.filter(repo => {
        const updatedAt = new Date(repo.updated_at);
        const daysSince = (now - updatedAt) / (1000 * 60 * 60 * 24);
        return daysSince < 30;
    });
    
    const recentStars = recentRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    
    if (recentStars > 50) return '🚀 Rapid Growth';
    if (recentStars > 20) return '📈 Growing';
    if (recentStars > 5) return '📊 Steady';
    return '💤 Slow';
}

// Display Dashboard
function displayDashboard(userData, repos, stats) {
    // User header
    document.getElementById('userAvatar').src = userData.avatar_url;
    document.getElementById('userName').textContent = userData.name || userData.login;
    document.getElementById('userBio').textContent = userData.bio || 'No bio available';
    
    // Top stats
    document.getElementById('totalStars').textContent = stats.totalStars;
    document.getElementById('totalFollowers').textContent = userData.followers;
    document.getElementById('totalRepos').textContent = repos.length;
    
    // Score cards
    document.getElementById('qualityScore').textContent = stats.qualityScore;
    document.getElementById('impactScore').textContent = stats.impactScore + '%';
    document.getElementById('growthTrend').textContent = stats.growthTrend;
    
    // Top repos chart
    displayTopReposChart(stats.topRepos);
    
    // Languages chart
    displayLanguagesChart(stats.languages);
    
    // Top repos table
    displayTopReposTable(stats.topRepos);
}

// Display Top Repos Chart
function displayTopReposChart(topRepos) {
    const ctx = document.getElementById('topReposChart');
    
    // Destroy existing chart if any
    if (window.topReposChartInstance) {
        window.topReposChartInstance.destroy();
    }
    
    const labels = topRepos.map(repo => repo.name.length > 20 ? repo.name.substring(0, 20) + '...' : repo.name);
    const data = topRepos.map(repo => repo.stargazers_count);
    
    window.topReposChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Stars',
                data: data,
                backgroundColor: 'rgba(147, 51, 234, 0.8)',
                borderColor: 'rgba(147, 51, 234, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}

// Display Languages Chart
function displayLanguagesChart(languages) {
    const ctx = document.getElementById('languagesChart');
    
    // Destroy existing chart if any
    if (window.languagesChartInstance) {
        window.languagesChartInstance.destroy();
    }
    
    // Get top 5 languages
    const sortedLanguages = Object.entries(languages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    const labels = sortedLanguages.map(lang => lang[0]);
    const data = sortedLanguages.map(lang => lang[1]);
    
    const colors = [
        'rgba(147, 51, 234, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(251, 146, 60, 0.8)',
        'rgba(239, 68, 68, 0.8)'
    ];
    
    window.languagesChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

// Display Top Repos Table
function displayTopReposTable(topRepos) {
    const tbody = document.getElementById('topReposTable');
    tbody.innerHTML = '';
    
    topRepos.forEach(repo => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        
        const updatedAt = new Date(repo.updated_at);
        const formattedDate = updatedAt.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
        
        row.innerHTML = `
            <td class="px-4 py-3">
                <a href="${repo.html_url}" target="_blank" class="text-purple-600 hover:underline font-medium">
                    ${repo.name}
                </a>
                <p class="text-sm text-gray-500 mt-1">${repo.description || 'No description'}</p>
            </td>
            <td class="px-4 py-3">
                <span class="inline-flex items-center">
                    <i class="fas fa-star text-yellow-500 mr-1"></i>
                    ${repo.stargazers_count}
                </span>
            </td>
            <td class="px-4 py-3">
                <span class="inline-flex items-center">
                    <i class="fas fa-code-branch text-gray-500 mr-1"></i>
                    ${repo.forks_count}
                </span>
            </td>
            <td class="px-4 py-3">
                <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    ${repo.language || 'N/A'}
                </span>
            </td>
            <td class="px-4 py-3 text-sm text-gray-500">
                ${formattedDate}
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Show Error
function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.querySelector('p').textContent = message;
    errorDiv.classList.remove('hidden');
    
    setTimeout(() => {
        errorDiv.classList.add('hidden');
    }, 5000);
}

// Initialize with default user
window.addEventListener('DOMContentLoaded', () => {
    // Auto-analyze default user
    analyzeProfile();
});

// Budget Tracker App
class BudgetTracker {
    constructor() {
        this.transactions = this.loadData('transactions') || [];
        this.monthlyBudget = this.loadData('monthlyBudget') || 0;
        this.expenseChart = null;
        this.trendChart = null;
        
        this.init();
    }

    init() {
        this.updateCurrentDate();
        this.bindEvents();
        this.updateSummary();
        this.renderTransactions();
        this.updateCharts();
        this.updateBudgetProgress();
        this.setDefaultDates();
    }

    // Data Management
    saveData(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    loadData(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    // Event Binding
    bindEvents() {
        // Form submissions
        document.getElementById('incomeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addIncome();
        });

        document.getElementById('expenseForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addExpense();
        });

        // Budget goal setting
        document.getElementById('setBudgetBtn').addEventListener('click', () => {
            this.setMonthlyBudget();
        });

        // Filters
        document.getElementById('filterType').addEventListener('change', () => {
            this.filterTransactions();
        });

        document.getElementById('filterPeriod').addEventListener('change', () => {
            this.filterTransactions();
        });
    }

    // Date Management
    updateCurrentDate() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        document.getElementById('currentDate').textContent = 
            now.toLocaleDateString('en-US', options);
    }

    setDefaultDates() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('incomeDate').value = today;
        document.getElementById('expenseDate').value = today;
    }

    // Transaction Management
    addIncome() {
        const description = document.getElementById('incomeDescription').value;
        const amount = parseFloat(document.getElementById('incomeAmount').value);
        const date = document.getElementById('incomeDate').value;

        if (!description || !amount || !date) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        const transaction = {
            id: Date.now(),
            type: 'income',
            description,
            amount,
            date,
            timestamp: new Date().toISOString()
        };

        this.transactions.unshift(transaction);
        this.saveData('transactions', this.transactions);
        this.updateAll();
        this.clearForm('incomeForm');
        this.showMessage('Income added successfully!', 'success');
    }

    addExpense() {
        const description = document.getElementById('expenseDescription').value;
        const amount = parseFloat(document.getElementById('expenseAmount').value);
        const category = document.getElementById('expenseCategory').value;
        const date = document.getElementById('expenseDate').value;

        if (!description || !amount || !category || !date) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        const transaction = {
            id: Date.now(),
            type: 'expense',
            description,
            amount,
            category,
            date,
            timestamp: new Date().toISOString()
        };

        this.transactions.unshift(transaction);
        this.saveData('transactions', this.transactions);
        this.updateAll();
        this.clearForm('expenseForm');
        this.showMessage('Expense added successfully!', 'success');
    }

    deleteTransaction(id) {
        if (confirm('Are you sure you want to delete this transaction?')) {
            this.transactions = this.transactions.filter(t => t.id !== id);
            this.saveData('transactions', this.transactions);
            this.updateAll();
            this.showMessage('Transaction deleted!', 'success');
        }
    }

    // Budget Management
    setMonthlyBudget() {
        const budget = parseFloat(document.getElementById('monthlyBudget').value);
        
        if (!budget || budget <= 0) {
            this.showMessage('Please enter a valid budget amount', 'error');
            return;
        }

        this.monthlyBudget = budget;
        this.saveData('monthlyBudget', this.monthlyBudget);
        this.updateBudgetProgress();
        this.showMessage('Monthly budget set successfully!', 'success');
    }

    updateBudgetProgress() {
        if (this.monthlyBudget <= 0) return;

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        const monthlyExpenses = this.transactions
            .filter(t => {
                const transactionDate = new Date(t.date);
                return t.type === 'expense' && 
                       transactionDate.getMonth() === currentMonth &&
                       transactionDate.getFullYear() === currentYear;
            })
            .reduce((sum, t) => sum + t.amount, 0);

        const remaining = this.monthlyBudget - monthlyExpenses;
        const percentSpent = (monthlyExpenses / this.monthlyBudget) * 100;

        document.getElementById('budgetAmount').textContent = this.formatCurrency(this.monthlyBudget);
        document.getElementById('spentAmount').textContent = this.formatCurrency(monthlyExpenses);
        document.getElementById('remainingAmount').textContent = this.formatCurrency(remaining);
        
        const progressFill = document.getElementById('progressFill');
        progressFill.style.width = `${Math.min(percentSpent, 100)}%`;
        
        if (percentSpent > 100) {
            progressFill.style.background = 'linear-gradient(90deg, #f56565 0%, #e53e3e 100%)';
        } else if (percentSpent > 80) {
            progressFill.style.background = 'linear-gradient(90deg, #fbd38d 0%, #d69e2e 100%)';
        } else {
            progressFill.style.background = 'linear-gradient(90deg, #48bb78 0%, #38a169 100%)';
        }

        document.getElementById('budgetProgress').style.display = 'block';
    }

    // Summary Calculations
    updateSummary() {
        const totalIncome = this.transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpenses = this.transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        const netBalance = totalIncome - totalExpenses;

        document.getElementById('totalIncome').textContent = this.formatCurrency(totalIncome);
        document.getElementById('totalExpenses').textContent = this.formatCurrency(totalExpenses);
        document.getElementById('netBalance').textContent = this.formatCurrency(netBalance);

        // Color coding for balance
        const balanceElement = document.getElementById('netBalance');
        if (netBalance >= 0) {
            balanceElement.style.color = '#48bb78';
        } else {
            balanceElement.style.color = '#f56565';
        }
    }

    // Transaction Rendering
    renderTransactions() {
        const container = document.getElementById('transactionsList');
        
        if (this.transactions.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-receipt"></i>
                    <p>No transactions yet. Start by adding some income or expenses!</p>
                </div>
            `;
            return;
        }

        const transactionsHTML = this.transactions.map(transaction => {
            const isIncome = transaction.type === 'income';
            const categoryBadge = transaction.category ? 
                `<span class="category-badge ${transaction.category}">${this.getCategoryName(transaction.category)}</span>` : '';

            return `
                <div class="transaction-item new">
                    <div class="transaction-details">
                        <div class="transaction-description">${transaction.description}</div>
                        <div class="transaction-meta">
                            <span>${this.formatDate(transaction.date)}</span>
                            ${categoryBadge}
                        </div>
                    </div>
                    <div class="transaction-amount ${transaction.type}">
                        ${isIncome ? '+' : '-'}${this.formatCurrency(transaction.amount)}
                    </div>
                    <div class="transaction-actions">
                        <button class="action-btn delete" onclick="budgetTracker.deleteTransaction(${transaction.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = transactionsHTML;
    }

    // Filtering
    filterTransactions() {
        const typeFilter = document.getElementById('filterType').value;
        const periodFilter = document.getElementById('filterPeriod').value;

        let filtered = this.transactions;

        // Filter by type
        if (typeFilter !== 'all') {
            filtered = filtered.filter(t => t.type === typeFilter);
        }

        // Filter by period
        if (periodFilter !== 'all') {
            const now = new Date();
            filtered = filtered.filter(t => {
                const transactionDate = new Date(t.date);
                
                switch (periodFilter) {
                    case 'thisMonth':
                        return transactionDate.getMonth() === now.getMonth() &&
                               transactionDate.getFullYear() === now.getFullYear();
                    case 'lastMonth':
                        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
                        return transactionDate.getMonth() === lastMonth.getMonth() &&
                               transactionDate.getFullYear() === lastMonth.getFullYear();
                    case 'thisYear':
                        return transactionDate.getFullYear() === now.getFullYear();
                    default:
                        return true;
                }
            });
        }

        this.renderFilteredTransactions(filtered);
    }

    renderFilteredTransactions(transactions) {
        const container = document.getElementById('transactionsList');
        
        if (transactions.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <p>No transactions match your current filters.</p>
                </div>
            `;
            return;
        }

        const transactionsHTML = transactions.map(transaction => {
            const isIncome = transaction.type === 'income';
            const categoryBadge = transaction.category ? 
                `<span class="category-badge ${transaction.category}">${this.getCategoryName(transaction.category)}</span>` : '';

            return `
                <div class="transaction-item">
                    <div class="transaction-details">
                        <div class="transaction-description">${transaction.description}</div>
                        <div class="transaction-meta">
                            <span>${this.formatDate(transaction.date)}</span>
                            ${categoryBadge}
                        </div>
                    </div>
                    <div class="transaction-amount ${transaction.type}">
                        ${isIncome ? '+' : '-'}${this.formatCurrency(transaction.amount)}
                    </div>
                    <div class="transaction-actions">
                        <button class="action-btn delete" onclick="budgetTracker.deleteTransaction(${transaction.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = transactionsHTML;
    }

    // Charts
    updateCharts() {
        this.updateExpenseChart();
        this.updateTrendChart();
    }

    updateExpenseChart() {
        const expenses = this.transactions.filter(t => t.type === 'expense');
        const categoryData = {};

        expenses.forEach(expense => {
            if (categoryData[expense.category]) {
                categoryData[expense.category] += expense.amount;
            } else {
                categoryData[expense.category] = expense.amount;
            }
        });

        const ctx = document.getElementById('expenseChart').getContext('2d');
        
        if (this.expenseChart) {
            this.expenseChart.destroy();
        }

        const categories = Object.keys(categoryData);
        const amounts = Object.values(categoryData);
        const colors = [
            '#f56565', '#48bb78', '#4299e1', '#fbd38d',
            '#e9d8fd', '#fbb6ce', '#bee3f8', '#c6f6d5'
        ];

        this.expenseChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: categories.map(cat => this.getCategoryName(cat)),
                datasets: [{
                    data: amounts,
                    backgroundColor: colors.slice(0, categories.length),
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true
                        }
                    }
                }
            }
        });
    }

    updateTrendChart() {
        const monthlyData = {};
        
        this.transactions.forEach(transaction => {
            const date = new Date(transaction.date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            
            if (!monthlyData[monthKey]) {
                monthlyData[monthKey] = { income: 0, expenses: 0 };
            }
            
            if (transaction.type === 'income') {
                monthlyData[monthKey].income += transaction.amount;
            } else {
                monthlyData[monthKey].expenses += transaction.amount;
            }
        });

        const sortedMonths = Object.keys(monthlyData).sort();
        const incomeData = sortedMonths.map(month => monthlyData[month].income);
        const expenseData = sortedMonths.map(month => monthlyData[month].expenses);

        const ctx = document.getElementById('trendChart').getContext('2d');
        
        if (this.trendChart) {
            this.trendChart.destroy();
        }

        this.trendChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: sortedMonths.map(month => {
                    const [year, monthNum] = month.split('-');
                    const date = new Date(year, monthNum - 1);
                    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                }),
                datasets: [
                    {
                        label: 'Income',
                        data: incomeData,
                        borderColor: '#48bb78',
                        backgroundColor: 'rgba(72, 187, 120, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Expenses',
                        data: expenseData,
                        borderColor: '#f56565',
                        backgroundColor: 'rgba(245, 101, 101, 0.1)',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Utility Functions
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(Math.abs(amount));
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    getCategoryName(category) {
        const categoryNames = {
            food: 'Food & Dining',
            transportation: 'Transportation',
            entertainment: 'Entertainment',
            utilities: 'Utilities',
            healthcare: 'Healthcare',
            shopping: 'Shopping',
            education: 'Education',
            other: 'Other'
        };
        return categoryNames[category] || category;
    }

    clearForm(formId) {
        document.getElementById(formId).reset();
        this.setDefaultDates();
    }

    showMessage(text, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;

        // Insert at the top of the dashboard
        const dashboard = document.querySelector('.dashboard');
        dashboard.insertBefore(message, dashboard.firstChild);

        // Auto remove after 3 seconds
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    updateAll() {
        this.updateSummary();
        this.renderTransactions();
        this.updateCharts();
        this.updateBudgetProgress();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.budgetTracker = new BudgetTracker();
});

// Add some sample data for demonstration (only if no data exists)
document.addEventListener('DOMContentLoaded', () => {
    const hasData = localStorage.getItem('transactions');
    if (!hasData) {
        setTimeout(() => {
            const sampleTransactions = [
                {
                    id: 1,
                    type: 'income',
                    description: 'Salary',
                    amount: 3500,
                    date: new Date().toISOString().split('T')[0],
                    timestamp: new Date().toISOString()
                },
                {
                    id: 2,
                    type: 'expense',
                    description: 'Grocery Shopping',
                    amount: 120,
                    category: 'food',
                    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
                    timestamp: new Date().toISOString()
                },
                {
                    id: 3,
                    type: 'expense',
                    description: 'Gas Bill',
                    amount: 85,
                    category: 'utilities',
                    date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
                    timestamp: new Date().toISOString()
                }
            ];
            
            localStorage.setItem('transactions', JSON.stringify(sampleTransactions));
            localStorage.setItem('monthlyBudget', JSON.stringify(2000));
            window.budgetTracker.transactions = sampleTransactions;
            window.budgetTracker.monthlyBudget = 2000;
            window.budgetTracker.updateAll();
        }, 500);
    }
});
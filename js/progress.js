// Progress Tracking System
class ProgressTracker {
    constructor() {
        this.storageKey = 'engineeringAcademy_progress';
        this.quizKey = 'engineeringAcademy_quizScores';
        this.init();
    }

    init() {
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify({
                'software-engineering': [],
                'programming': [],
                'electrical-engineering': [],
                'mechanical-engineering': []
            }));
        }
        if (!localStorage.getItem(this.quizKey)) {
            localStorage.setItem(this.quizKey, JSON.stringify({}));
        }
    }

    markLessonComplete(course, lessonId) {
        const progress = this.getProgress();
        if (!progress[course].includes(lessonId)) {
            progress[course].push(lessonId);
            localStorage.setItem(this.storageKey, JSON.stringify(progress));
            this.showCompletionNotification();
        }
    }

    isLessonComplete(course, lessonId) {
        const progress = this.getProgress();
        return progress[course] && progress[course].includes(lessonId);
    }

    getProgress() {
        return JSON.parse(localStorage.getItem(this.storageKey));
    }

    getCourseProgress(course) {
        const progress = this.getProgress();
        return progress[course] ? progress[course].length : 0;
    }

    saveQuizScore(course, lessonId, score, total) {
        const scores = JSON.parse(localStorage.getItem(this.quizKey));
        const key = `${course}_${lessonId}`;
        scores[key] = {
            score,
            total,
            percentage: Math.round((score / total) * 100),
            date: new Date().toISOString()
        };
        localStorage.setItem(this.quizKey, JSON.stringify(scores));
    }

    getQuizScore(course, lessonId) {
        const scores = JSON.parse(localStorage.getItem(this.quizKey));
        return scores[`${course}_${lessonId}`] || null;
    }

    getAllScores() {
        return JSON.parse(localStorage.getItem(this.quizKey));
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
            localStorage.removeItem(this.storageKey);
            localStorage.removeItem(this.quizKey);
            this.init();
            location.reload();
        }
    }

    showCompletionNotification() {
        const notification = document.createElement('div');
        notification.className = 'completion-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">🎉</span>
                <span>Lesson marked as complete!</span>
            </div>
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    exportProgress() {
        const data = {
            progress: this.getProgress(),
            scores: this.getAllScores(),
            exportDate: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `engineering-academy-progress-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Quiz System
class Quiz {
    constructor(questions, course, lessonId) {
        this.questions = questions;
        this.course = course;
        this.lessonId = lessonId;
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        this.tracker = new ProgressTracker();
    }

    render(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-header">
                    <div class="quiz-progress-bar">
                        <div class="quiz-progress-fill" style="width: 0%"></div>
                    </div>
                    <div class="quiz-info">
                        <span>Question <span class="current-q">1</span> of ${this.questions.length}</span>
                        <span class="quiz-score">Score: <span class="score-value">0</span>/${this.questions.length}</span>
                    </div>
                </div>
                <div class="quiz-body">
                    <div class="quiz-question"></div>
                    <div class="quiz-options"></div>
                </div>
                <div class="quiz-footer">
                    <button class="quiz-btn quiz-prev" disabled>Previous</button>
                    <button class="quiz-btn quiz-next">Next</button>
                </div>
            </div>
        `;

        this.showQuestion();
        this.attachEventListeners();
    }

    showQuestion() {
        const question = this.questions[this.currentQuestion];
        const questionEl = this.container.querySelector('.quiz-question');
        const optionsEl = this.container.querySelector('.quiz-options');
        
        questionEl.innerHTML = `<h3>${question.question}</h3>`;
        
        optionsEl.innerHTML = question.options.map((option, index) => `
            <div class="quiz-option" data-index="${index}">
                <input type="radio" name="answer" id="option${index}" value="${index}" 
                    ${this.answers[this.currentQuestion] === index ? 'checked' : ''}>
                <label for="option${index}">${option}</label>
            </div>
        `).join('');

        this.updateProgress();
        this.updateNavButtons();
    }

    attachEventListeners() {
        const nextBtn = this.container.querySelector('.quiz-next');
        const prevBtn = this.container.querySelector('.quiz-prev');

        nextBtn.addEventListener('click', () => this.nextQuestion());
        prevBtn.addEventListener('click', () => this.previousQuestion());

        this.container.querySelectorAll('input[name="answer"]').forEach(input => {
            input.addEventListener('change', (e) => {
                this.answers[this.currentQuestion] = parseInt(e.target.value);
                this.checkAnswer();
            });
        });
    }

    checkAnswer() {
        const selectedAnswer = this.answers[this.currentQuestion];
        const correctAnswer = this.questions[this.currentQuestion].correct;
        
        if (selectedAnswer === correctAnswer && !this.questions[this.currentQuestion].answered) {
            this.score++;
            this.questions[this.currentQuestion].answered = true;
            this.updateScore();
        }
    }

    nextQuestion() {
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.showQuestion();
        } else {
            this.showResults();
        }
    }

    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.showQuestion();
        }
    }

    updateProgress() {
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        this.container.querySelector('.quiz-progress-fill').style.width = `${progress}%`;
        this.container.querySelector('.current-q').textContent = this.currentQuestion + 1;
    }

    updateScore() {
        this.container.querySelector('.score-value').textContent = this.score;
    }

    updateNavButtons() {
        const prevBtn = this.container.querySelector('.quiz-prev');
        const nextBtn = this.container.querySelector('.quiz-next');
        
        prevBtn.disabled = this.currentQuestion === 0;
        nextBtn.textContent = this.currentQuestion === this.questions.length - 1 ? 'Finish' : 'Next';
    }

    showResults() {
        const percentage = Math.round((this.score / this.questions.length) * 100);
        const passed = percentage >= 70;
        
        this.tracker.saveQuizScore(this.course, this.lessonId, this.score, this.questions.length);
        
        if (passed) {
            this.tracker.markLessonComplete(this.course, this.lessonId);
        }

        this.container.innerHTML = `
            <div class="quiz-results ${passed ? 'passed' : 'failed'}">
                <div class="results-icon">${passed ? '🎉' : '📚'}</div>
                <h2>${passed ? 'Congratulations!' : 'Keep Learning!'}</h2>
                <div class="results-score">
                    <div class="score-circle">
                        <svg width="200" height="200">
                            <circle cx="100" cy="100" r="90" fill="none" stroke="#e0e0e0" stroke-width="12"/>
                            <circle cx="100" cy="100" r="90" fill="none" stroke="${passed ? '#4CAF50' : '#FF9800'}" 
                                stroke-width="12" stroke-dasharray="565.48" 
                                stroke-dashoffset="${565.48 - (565.48 * percentage / 100)}"
                                transform="rotate(-90 100 100)"/>
                        </svg>
                        <div class="score-text">
                            <div class="score-percentage">${percentage}%</div>
                            <div class="score-label">${this.score}/${this.questions.length}</div>
                        </div>
                    </div>
                </div>
                <p class="results-message">
                    ${passed 
                        ? 'Great job! You\'ve mastered this lesson.' 
                        : 'You need 70% to pass. Review the material and try again.'}
                </p>
                <div class="results-actions">
                    <button class="quiz-btn" onclick="location.reload()">Review Lesson</button>
                    ${passed ? '<button class="quiz-btn quiz-btn-primary" onclick="location.href=document.querySelector(\'.lesson-navigation a:last-child\').href">Next Lesson</button>' : '<button class="quiz-btn quiz-btn-primary" onclick="location.reload()">Try Again</button>'}
                </div>
            </div>
        `;
    }
}

// Progress Dashboard
function renderProgressDashboard() {
    const tracker = new ProgressTracker();
    const progress = tracker.getProgress();
    const scores = tracker.getAllScores();
    
    const courseTotals = {
        'software-engineering': 12,
        'programming': 12,
        'electrical-engineering': 12,
        'mechanical-engineering': 12
    };

    const courseNames = {
        'software-engineering': 'Software Engineering',
        'programming': 'Programming',
        'electrical-engineering': 'Electrical Engineering',
        'mechanical-engineering': 'Mechanical Engineering'
    };

    let totalCompleted = 0;
    let totalLessons = 0;
    let totalQuizzes = Object.keys(scores).length;
    let averageScore = 0;

    if (totalQuizzes > 0) {
        const sum = Object.values(scores).reduce((acc, score) => acc + score.percentage, 0);
        averageScore = Math.round(sum / totalQuizzes);
    }

    for (const course in courseTotals) {
        totalCompleted += progress[course].length;
        totalLessons += courseTotals[course];
    }

    const overallPercentage = Math.round((totalCompleted / totalLessons) * 100);

    const dashboardHTML = `
        <div class="progress-dashboard">
            <div class="dashboard-header">
                <h2>📊 Your Learning Progress</h2>
                <button class="dashboard-btn" onclick="new ProgressTracker().exportProgress()">
                    💾 Export Progress
                </button>
                <button class="dashboard-btn dashboard-btn-danger" onclick="new ProgressTracker().resetProgress()">
                    🔄 Reset Progress
                </button>
            </div>
            
            <div class="dashboard-stats">
                <div class="stat-card">
                    <div class="stat-icon">📚</div>
                    <div class="stat-value">${totalCompleted}/${totalLessons}</div>
                    <div class="stat-label">Lessons Completed</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">✅</div>
                    <div class="stat-value">${overallPercentage}%</div>
                    <div class="stat-label">Overall Progress</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🎯</div>
                    <div class="stat-value">${totalQuizzes}</div>
                    <div class="stat-label">Quizzes Taken</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">⭐</div>
                    <div class="stat-value">${averageScore}%</div>
                    <div class="stat-label">Average Score</div>
                </div>
            </div>

            <div class="course-progress-grid">
                ${Object.keys(courseTotals).map(courseId => {
                    const completed = progress[courseId].length;
                    const total = courseTotals[courseId];
                    const percentage = Math.round((completed / total) * 100);
                    return `
                        <div class="course-progress-card">
                            <h3>${courseNames[courseId]}</h3>
                            <div class="progress-bar-container">
                                <div class="progress-bar-fill" style="width: ${percentage}%"></div>
                            </div>
                            <div class="progress-stats">
                                <span>${completed}/${total} lessons</span>
                                <span class="progress-percentage">${percentage}%</span>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    return dashboardHTML;
}

// Initialize progress tracking on page load
document.addEventListener('DOMContentLoaded', function() {
    const tracker = new ProgressTracker();
    
    // Update course cards with progress
    document.querySelectorAll('.course-card').forEach(card => {
        const courseId = card.getAttribute('data-course-id');
        if (courseId) {
            const progress = tracker.getCourseProgress(courseId);
            const total = 12; // All courses have 12 lessons
            const percentage = Math.round((progress / total) * 100);
            
            const progressHTML = `
                <div class="card-progress">
                    <div class="progress-bar-mini">
                        <div class="progress-fill-mini" style="width: ${percentage}%"></div>
                    </div>
                    <span class="progress-text">${progress}/${total} completed</span>
                </div>
            `;
            
            const progressContainer = card.querySelector('.card-progress-container');
            if (progressContainer) {
                progressContainer.innerHTML = progressHTML;
            }
        }
    });

    // Render progress dashboard on homepage
    const dashboardContainer = document.getElementById('progressDashboard');
    if (dashboardContainer) {
        dashboardContainer.innerHTML = renderProgressDashboard();
    }

        const isComplete = tracker.isLessonComplete(courseName, lessonId);
        
        const completeBtn = document.createElement('button');
        completeBtn.className = `mark-complete-btn ${isComplete ? 'completed' : ''}`;
        completeBtn.innerHTML = isComplete ? '✓ Completed' : 'Mark as Complete';
        completeBtn.onclick = function() {
            tracker.markLessonComplete(courseName, lessonId);
            this.classList.add('completed');
            this.innerHTML = '✓ Completed';
        };
        
        const navigation = document.querySelector('.lesson-navigation');
        if (navigation) {
            navigation.insertBefore(completeBtn, navigation.firstChild);
        }
    }
});

// Export for use in HTML
window.ProgressTracker = ProgressTracker;
window.Quiz = Quiz;
window.renderProgressDashboard = renderProgressDashboard;

CREATE DATABASE IF NOT EXISTS miniblog_db;
USE miniblog_db;

CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    isPublished BOOLEAN DEFAULT FALSE,
    likes INT DEFAULT 0,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Dummy Data (20 records)
INSERT INTO posts (title, content, author, isPublished, likes) VALUES 
('Getting Started with React', 'React is a popular frontend library developed by Facebook for building user interfaces...', 'Alice Smith', TRUE, 42),
('Understanding Kubernetes', 'K8s is an open-source system for automating deployment, scaling, and management of containerized applications.', 'Bob Jones', TRUE, 15),
('Tailwind CSS Tips', 'Utility-first CSS frameworks like Tailwind provide low-level utility classes that let you build completely custom designs.', 'Charlie Brown', FALSE, 0),
('Node.js Event Loop Explained', 'The event loop is what allows Node.js to perform non-blocking I/O operations despite the fact that JavaScript is single-threaded.', 'Dave Wilson', TRUE, 120),
('Mastering MySQL Joins', 'Understanding INNER, LEFT, RIGHT, and FULL outer joins is essential for relational database architecture.', 'Eve Davis', TRUE, 89),
('Why TypeScript?', 'TypeScript adds optional static typing to JavaScript, catching errors early before they execute.', 'Frank White', FALSE, 1),
('A Guide to Docker Multi-Stage Builds', 'Multi-stage builds allow you to optimize your Dockerfiles by discarding unnecessary intermediate layers.', 'Grace Lee', TRUE, 55),
('Express vs Fastify', 'Express is the industry standard, but Fastify is gaining traction due to minimal overhead and faster routing.', 'Heidi Miller', TRUE, 34),
('Best IDE for JavaScript', 'VS Code remains dominant, but let us look at WebStorm and Neovim workflows...', 'Ivan Scott', FALSE, 5),
('Securing Your REST APIs', 'Implement JWT, helmet.js, and rate limiting to secure your public HTTP APIs.', 'Oscar Wilde', TRUE, 77),
('Top 10 NPM Packages in 2026', 'A curated list of the most valuable open-source libraries to supercharge your web apps.', 'Paul Ford', TRUE, 230),
('State Management in React', 'Redux, Zustand, Recoil, or React Context? A comprehensive comparison layout.', 'Quinn Fabray', TRUE, 10),
('Introduction to CI/CD', 'Continuous integration guarantees stability by merging all developer working copies to a shared mainline.', 'Rachel Green', FALSE, 0),
('Designing a Mini Blog', 'A practical tutorial mimicking the steps to craft a modern fullstack posting application.', 'Steve Jobs', TRUE, 1000),
('Redis Caching Strategies', 'Learn when to employ Write-through versus cache-aside data management strategies.', 'Tony Stark', TRUE, 999),
('Cloud Native Architecture', 'Moving beyond simply containerizing applications into building specifically for distributed systems.', 'Bruce Wayne', FALSE, 5),
('Horizontal vs Vertical Scaling', 'When do you buy a bigger server, and when do you just buy more servers?', 'Clark Kent', TRUE, 45),
('Building Reactive UIs', 'How reactive paradigms map state to user interfaces declaratively.', 'Diana Prince', TRUE, 18),
('The Future of Web Development', 'Will WASM completely replace Javascript across frontend browsers?', 'Barry Allen', FALSE, 12),
('Deploying to AWS EKS', 'Connecting the dots between Managed Kubernetes offerings and basic command-line interactions.', 'Arthur Curry', TRUE, 66);

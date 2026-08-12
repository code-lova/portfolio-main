<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class PortfolioDataSeeder extends Seeder
{
    /**
     * Imports the original portfolio.sql dataset (blog posts, projects,
     * categories, the admin user, settings, counters) into a freshly
     * migrated database. Safe to run once against an empty database.
     */
    public function run(): void
    {
        DB::table('categories')->insert(array (
  0 => 
  array (
    'id' => 1,
    'name' => 'Web Application',
    'slug' => 'web-application',
    'status' => 1,
    'created_at' => '2024-06-20 23:49:53',
    'updated_at' => '2024-06-20 23:49:53',
  ),
  1 => 
  array (
    'id' => 2,
    'name' => 'Mobile Application',
    'slug' => 'mobile-application',
    'status' => 1,
    'created_at' => '2024-06-20 23:55:51',
    'updated_at' => '2024-06-22 15:33:10',
  ),
  2 => 
  array (
    'id' => 3,
    'name' => 'Programming',
    'slug' => 'programming',
    'status' => 1,
    'created_at' => '2024-06-21 18:40:25',
    'updated_at' => '2024-06-22 15:36:58',
  ),
  3 => 
  array (
    'id' => 6,
    'name' => 'SaaS Application',
    'slug' => 'saas-application',
    'status' => 1,
    'created_at' => '2024-06-26 11:52:00',
    'updated_at' => '2024-06-26 11:52:00',
  ),
));

        DB::table('blog_categories')->insert(array (
  0 => 
  array (
    'id' => 1,
    'name' => 'Technology',
    'slug' => 'technology',
    'meta_title' => 'technology',
    'meta_keyword' => 'ebizo jeremiah blog, jeremiah ebizo blog, ebinuga tech',
    'meta_description' => 'Jeremiah ebizo blog about technology, learn more and get informed about my post on technology and coding.',
    'status' => 1,
    'created_at' => '2024-06-23 20:16:04',
    'updated_at' => '2024-06-23 20:58:16',
  ),
  1 => 
  array (
    'id' => 2,
    'name' => 'Development',
    'slug' => 'development',
    'meta_title' => 'development',
    'meta_keyword' => 'ebizo jeremiah blog, jeremiah ebizo blog, ebinuga development',
    'meta_description' => 'Jeremiah ebizo blog about education, learn more and get informed about my post on software development and coding.',
    'status' => 1,
    'created_at' => '2024-06-23 20:36:59',
    'updated_at' => '2024-06-24 10:34:10',
  ),
  2 => 
  array (
    'id' => 3,
    'name' => 'Web3',
    'slug' => 'web3',
    'meta_title' => 'web3',
    'meta_keyword' => 'ebizo jeremiah blog, jeremiah ebizo blog, ebinuga web 3',
    'meta_description' => 'Jeremiah ebizo blog about the web3, learn more and get informed about my post on web3 news and updates.',
    'status' => 1,
    'created_at' => '2024-06-23 20:39:45',
    'updated_at' => '2024-06-23 20:39:45',
  ),
));

        DB::table('users')->insert(array (
  0 => 
  array (
    'id' => 1,
    'name' => 'Administrator',
    'email' => 'ebinuga@hotmail.com',
    'email_verified_at' => '2024-06-16 21:50:45',
    'password' => '$2y$12$1N/4bVNzKaJW1ugIjvELruRX.c0wYoNp8vp3/8PNLrHd9AB72HYB6',
    'role_as' => 'admin01',
    'remember_token' => 'j64KzCRUTtXnjectGdhBcWFaCkDqrgyLMqJLqSjEC3lIqURiugcX4qPrX63E',
    'created_at' => '2024-06-16 21:50:46',
    'updated_at' => '2024-07-01 08:18:51',
  ),
));

        DB::table('settings')->insert(array (
  0 => 
  array (
    'id' => 1,
    'blog' => 0,
    'email_notification' => 1,
    'created_at' => '2024-06-26 16:49:00',
    'updated_at' => '2024-06-26 16:55:15',
  ),
));

        DB::table('counters')->insert(array (
  0 => 
  array (
    'id' => 1,
    'views' => 5,
    'created_at' => '2024-06-26 05:06:34',
    'updated_at' => '2026-08-12 05:57:00',
  ),
));

        DB::table('projects')->insert(array (
  0 => 
  array (
    'id' => 1,
    'category_id' => 3,
    'image' => 'uploads/project/1719098498.pEXoxriHPjWeAMj5OGm8P0wtWohhEvMbIROHgtEA.png',
    'project_name' => 'Promptopia',
    'description' => 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci ratione dicta iure, expedita consequuntur nemo exercitationem eum. 

Saepe id at quo, voluptatem repellat veniam aspernatur praesentium ipsum ab eligendi accusantium nemo nobis nihil aut! Odit natus sunt sapiente. 

Dolorum minus voluptatibus deleniti amet doloribus, sed magnam? Dolore voluptas praesentium dolorem.',
    'hash_tag_tech' => '#Html, #Tailwind CSS',
    'status' => 1,
    'code_base' => 'github.com',
    'project_link' => 'null',
    'demo_link' => 'null',
    'created_at' => '2024-06-22 22:21:38',
    'updated_at' => '2024-06-24 16:09:23',
  ),
));

        DB::table('blogs')->insert(array (
  0 => 
  array (
    'id' => 1,
    'blog_category_id' => 1,
    'title' => 'Multiple AI companies bypassing web standard to scrape publisher sites, licensing firm says',
    'description' => 'Multiple artificial intelligence (AI) companies are reportedly bypassing the widely accepted Robots Exclusion Protocol (robots.txt) to scrape content from websites without permission, according to a letter sent by content licensing startup TollBit to publishers. 

This standard, designed to prevent unauthorized web crawling, has been ignored by AI agents from various companies, leading to a public dispute between AI search startup Perplexity and Forbes, which accused Perplexity of plagiarizing its investigative stories. Perplexity did not comment on the accusations, but a Wired investigation supports Forbes\' claims that Perplexity bypassed the robots.txt protocol.

The News Media Alliance, representing over 2,200 U.S. publishers, expressed concern that ignoring "do not crawl" signals could severely impact their ability to monetize content and support journalism. Danielle Coffey, president of the group, highlighted the financial risks posed to the industry if AI companies continue to scrape content without compensation. 

TollBit, positioning itself as a mediator, aims to facilitate licensing deals between AI companies and publishers, allowing publishers to set fees for different types of content, such as premium news and exclusive insights.

TollBit\'s letter indicated that numerous AI agents from various sources are bypassing the robots.txt protocol to access website content. This behavior undermines the protocol\'s original purpose, which dates back to the mid-1990s, to prevent web crawlers from overloading websites. 

While there is no clear legal enforcement for robots.txt, compliance has historically been high, and some groups believe there could be legal recourse for publishers.

The issue has gained prominence as generative AI systems increasingly use scraped content to train algorithms and generate real-time summaries. Publishers like the New York Times have sued AI companies for copyright infringement, while others, including Thomson Reuters, have struck licensing deals. However, the debate continues over the value of such content and the legality of accessing it for free. 

The controversy is further complicated by Google\'s AI-powered summaries, which require publishers to block both AI and regular search crawlers to protect their content, potentially reducing their visibility online.',
    'image' => 'uploads/blog/1719184277.8XAO7mHlnm4U3f9CpD8cHUI3U6z4gka52LbbZ9d9.webp',
    'meta_title' => 'Jeremiah Ebizo Blog on Technology',
    'meta_keywords' => 'ebizo jeremiah, web scraping, AI companies, bypassing web standard',
    'meta_description' => 'Multiple AI companies bypassing web standard to scrape publisher sites, licensing firm says.',
    'status' => 1,
    'created_at' => '2024-06-23 22:11:17',
    'updated_at' => '2024-06-24 09:56:30',
  ),
  1 => 
  array (
    'id' => 2,
    'blog_category_id' => 1,
    'title' => 'Apple and Meta have discussed AI partnership, WSJ reports',
    'description' => 'Meta Platforms, the parent company of Facebook, is reportedly in talks to integrate its generative AI model into Apple\'s recently announced AI system for iPhones, according to the Wall Street Journal. This move aligns with Apple\'s plans to incorporate technology from various AI companies into its devices. 

Apple is also rumored to be considering a potential collaboration with Google, its long-time search partner. Additionally, Apple is expected to explore partnerships with AI firms in regions like China, where ChatGPT, backed by Microsoft, is banned. AI startup Anthropic has also been in discussions with Apple to bring its generative AI to Apple Intelligence.

These discussions, although not yet finalized, highlight Apple\'s strategy to integrate new AI technologies into its products, including Siri, while maintaining a focus on privacy. 

Meta, Anthropic, and AI search startup Perplexity are among the companies negotiating with Apple, potentially leading to a broader distribution of their AI products and the sale of premium subscriptions through Apple Intelligence. While the financial implications of these deals are not yet clear, they signify a significant push by Apple to enhance its AI capabilities and differentiate itself from competitors like Microsoft and Google.',
    'image' => 'uploads/blog/1719227307.dz5xrYBGnR9KT3DqYzZmCPe8osWRU8vbY157oeHD.webp',
    'meta_title' => 'Apple and Meta have discussed AI partnership',
    'meta_keywords' => 'ebizo jeremiah, apple, AI, meta partnership',
    'meta_description' => 'Apple and Meta have discussed AI partnership',
    'status' => 1,
    'created_at' => '2024-06-24 10:08:27',
    'updated_at' => '2024-06-24 10:08:27',
  ),
  2 => 
  array (
    'id' => 3,
    'blog_category_id' => 2,
    'title' => 'Extending your limits as a Backend Engineer',
    'description' => 'Dear Backend Engineer, I regret to inform you, that merely knowing CRUD operations and basic backend tasks was never enough.

Not many people will tell you this, but to truly stand out and excel in your career as a backend engineer, it\'s essential to delve deeper into core principles like systems architecture, system design, and more. 

Here\'s why and how mastering these areas can elevate your engineering prowess:

1. Understanding Systems Architecture:
Systems architecture is the blueprint of scalable, efficient, and maintainable software. By grasping concepts like microservices, monolithic architectures, and serverless computing, you can design systems that are robust and adaptable to change.


2. Mastering System Design:
System design goes beyond coding. It involves creating high-level structures that solve complex problems. This includes knowledge of design patterns, scalability, fault tolerance, and distributed systems. Being proficient in system design can help you foresee potential issues and innovate better solutions.


3. Implementing Load Balancing:
Load balancing ensures your application can handle high traffic efficiently. Understanding various strategies (round-robin, least connections, IP hash, etc.) and tools (NGINX, HAProxy, AWS Elastic Load Balancing) will make your systems more resilient and performant.


4. Leveraging Caching:
Caching significantly boosts application performance by reducing database load and latency. Familiarize yourself with different caching mechanisms (in-memory caches like Redis and Memcached, distributed caches, etc.) to deliver faster and more efficient applications.


5. Optimizing Data Logging and Monitoring:
Effective logging and monitoring are critical for diagnosing issues, understanding user behaviour, and ensuring system health. Tools like ELK Stack, Prometheus, and Grafana can help you maintain robust monitoring and alerting systems.


6. Ensuring Security:
Security should be a priority from the start. Learn about common vulnerabilities (SQL injection, XSS, CSRF) and how to mitigate them. Implementing secure authentication, authorization, and encryption practices can protect your users and data.


7. Exploring CI/CD and DevOps Practices:
Continuous Integration and Continuous Deployment (CI/CD) pipelines streamline the development process, reduce bugs, and accelerate feature delivery. Embrace DevOps tools (Jenkins, GitLab CI, Docker, Kubernetes) to automate and enhance your development workflow.


8. Enhancing Communication Skills:
Technical prowess is important, but so are communication skills. Being able to explain your designs, collaborate with cross-functional teams, and document your work effectively can set you apart as a well-rounded engineer.

Go far and beyond, this will make you stand out, even during interviews. "Emmanuel Lucius - Linkedin"',
    'image' => 'uploads/blog/1719228496.aqOaRgmrSgs2pS4eGZ4K8nNuVKKNVraVYGsl1Vit.webp',
    'meta_title' => 'Extending your limits as a Backend Engineer.',
    'meta_keywords' => 'ebizo jeremiah, backend engineer, engineering, backend',
    'meta_description' => 'Extending your limits as a Backend Engineer.',
    'status' => 1,
    'created_at' => '2024-06-24 10:15:55',
    'updated_at' => '2024-06-24 10:28:16',
  ),
));


        if (DB::connection()->getDriverName() === 'pgsql') {
            foreach (['categories', 'blog_categories', 'users', 'settings', 'counters', 'projects', 'blogs', 'contact_messages'] as $table) {
                if (Schema::hasTable($table)) {
                    DB::statement("SELECT setval(pg_get_serial_sequence('{$table}', 'id'), COALESCE((SELECT MAX(id) FROM {$table}), 1))");
                }
            }
        }
    }
}

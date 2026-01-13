# Deploying to Vercel

This guide provides step-by-step instructions on how to deploy the AFCON 2025 Dashboard to Vercel.

## 1. Step-by-Step Deployment Instructions

1.  **Sign up for a Vercel account:** If you don't have one already, sign up for a free Vercel account at [vercel.com](https://vercel.com).
2.  **Create a new project:** Once you're logged in, click the "Add New..." button and select "Project".
3.  **Import your Git repository:**
    *   Connect your GitHub, GitLab, or Bitbucket account to Vercel.
    *   Select the repository for the AFCON 2025 Dashboard.
4.  **Configure your project:**
    *   **Project Name:** Vercel will automatically use the name of your repository, but you can change it if you want.
    *   **Framework Preset:** Vercel should automatically detect that you're using Vite. If not, select "Vite" from the dropdown menu.
    *   **Build and Output Settings:** Vercel should automatically detect the build command (`npm run build`) and the output directory (`dist`) from the `vercel.json` file. If not, you can configure them manually.
        *   **Build Command:** `npm run build`
        *   **Output Directory:** `dist`
    *   **Install Command:** `npm install`
5.  **Deploy:** Click the "Deploy" button. Vercel will then build and deploy your application.

## 2. Environment Variables Setup

This project does not require any environment variables for the current setup. However, if you were to connect to a live API in the future, you would need to add the API endpoint and any necessary API keys as environment variables.

To add environment variables in Vercel:

1.  Go to your project's dashboard on Vercel.
2.  Click the "Settings" tab.
3.  Click the "Environment Variables" menu item.
4.  Add your environment variables, making sure to select the appropriate environments (Production, Preview, Development).

## 3. Custom Domain Setup

To set up a custom domain for your deployed application:

1.  Go to your project's dashboard on Vercel.
2.  Click the "Settings" tab.
3.  Click the "Domains" menu item.
4.  Enter your custom domain and click "Add".
5.  Vercel will provide you with instructions on how to configure your DNS records. You'll need to add either an `A` record or a `CNAME` record to your domain's DNS settings.

## 4. Continuous Deployment from GitHub

Vercel automatically sets up continuous deployment when you connect your GitHub repository. This means that every time you push a new commit to your `main` branch, Vercel will automatically trigger a new deployment.

You can also configure Vercel to deploy from other branches, such as a `develop` or `staging` branch.

## 5. Performance Optimization Tips for Vercel

*   **Image Optimization:** Vercel automatically optimizes images for you. However, it's still a good practice to compress your images before uploading them to your repository.
*   **Caching:** Vercel automatically caches your static assets. You can also configure custom caching headers in your `vercel.json` file.
*   **Serverless Functions:** For more complex applications, you can use Vercel's serverless functions to run server-side code without having to manage a server.
*   **Analytics:** Vercel provides built-in analytics to help you monitor the performance of your application.

## 6. Troubleshooting Common Issues

*   **Build fails:** If your build fails, check the build logs in the Vercel dashboard for any error messages. The most common cause of build failures is missing dependencies or incorrect build settings.
*   **404 errors:** If you're getting 404 errors on some of your pages, it's likely due to a misconfiguration of the routing. The `vercel.json` file created earlier should handle this, but if you're still having issues, you can add a `rewrites` rule to your `vercel.json` file to redirect all requests to your `index.html` file.
*   **Font issues:** If your custom fonts are not loading, make sure that the font files are located in the `public/fonts` directory and that the paths in your CSS are correct. Also, check the Vercel logs for any errors related to font loading.

By following these instructions, you should be able to successfully deploy the AFCON 2025 Dashboard to Vercel and share it with the world.

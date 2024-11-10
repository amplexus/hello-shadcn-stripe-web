<div align="center">
  <h1>Hello Shadcn</h1>
  <br/>

![Badge Test](https://github.com/amplexus/hello-shadcn/actions/workflows/test.yaml/badge.svg)
![Badge Push](https://github.com/amplexus/hello-shadcn/actions/workflows/push.yaml/badge.svg)

  <br/>
</div>

# About

A boilerplate template application structure for my projects.

This is a [Next.js](https://nextjs.org) demonstration project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

It also uses NextAuth [NextAuth](https://next-auth.js) for authentication and [Shadcn UI](https://ui.shadcn.com) for styling.

It also integrates with stripe payment gateway for payment processing.

And finally it uses GitHub actions to build a docker image and push it to DockerHub.

# Getting Started

First, run the development server locally:

```bash
docker run -p 3000:3000 hello-shadcn
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# Testing NextAuth Github

First, create a new app on [Github](https://github.com/settings/apps/new). Specify the redirect URL as [http://localhost:3000/api/auth/callback](https://localhost:8443/api/auth/callback).

Take note of your github client id and secret.

Next, edit `.env` to add your github client id and secret.

Next, run the development server locally:

```bash
npm run dev-ssl
```

Now open [http://localhost:8443](http://localhost:8443) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# Testing Github Actions Locally

You can do this using `act`, a CLI tool for running GitHub Actions locally: `https://github.com/netktos/act`

Running `act` by default will emulate an on-push event to run any workflows that are tied to pushing code to the repo.

Useful commands:

```
act -l # list all actions for events
act workflow_dispatch -l # list the actions for a specific event
act -j test -l # list the actions for a specific job
act # run the default "push" event
act pull_request # run the default "pull_request" event
act -j test # run a specific job
```

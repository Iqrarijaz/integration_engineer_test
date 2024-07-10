# Job Application API

This repository contains an API for handling job postings and applications. The API is designed to integrate with job platforms like Indeed, allowing you to post jobs and receive applications seamlessly.

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
  - [Create Job Posting](#post-jobs)
  - [Get Active Jobs](#get-jobs)
  - [Get Jobs in XML for Indeed](#get-jobsindeedxml)
  - [Receive Job Application](#post-apiapplications)
- [Error Handling](#error-handling)

## Overview

The Job Application API provides endpoints for managing job postings and applications. It includes integration with Indeed, allowing you to expose job postings in XML format and handle incoming job applications.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Iqrarijaz/integration_engineer_test.git
    ```
2. Navigate to the project directory:
    ```sh
    cd job-application-api
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Set up environment variables:
    Create a `.env` file in the root directory and add the following variables:
    ```plaintext
    HOST=localhost
    PORT=
    DATABASE_PORT=
    DATABASE_USER=
    DATABASE_PASSWORD=
    DOMAIN=http://localhost
    DATABASE_NAME=
    ```

## Usage

1. Start the server:
    ```sh
    npm start
    ```
2. The API will be available at `http://localhost:<PORT>`.

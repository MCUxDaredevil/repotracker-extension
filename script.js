const { Octokit, App } = require("octokit");
require('dotenv').config();

const config = require('./config.json');

// document.getElementById("id").innerHTML
// https://github.com/MCUxDaredevil/repotracker-extension/commit/d092a75161f08cffd9b59f7ff0cd239e4e92cc54
// Color dim red if archived
// Color dim green if new update or no past data in database

async function main() {
    const api = new Octokit({auth: process.env.GITHUB_TOKEN});
    const repositories = config.repo_list;
    for (const repository of repositories) {
        const [owner, repo] = repository.split("github.com/")[1].split("/");

        await api.request(`GET /repos/${owner}/${repo}/`, {
            headers: {
                accept: "application/vnd.github+json"
            },
        }).then((response) => {
            const data = response.data;
            console.log(data.pushed_at);
        }).catch((error) => {
            console.log(error);
        });
    }
}

main();
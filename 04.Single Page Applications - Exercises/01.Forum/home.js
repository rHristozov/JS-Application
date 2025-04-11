import { createElements } from "./utils.js";
import { showComments } from "./details.js";

export async function showHome(event) {
    event?.preventDefault();

    let topicTitleDivElement = document.querySelector('.topic-title');
    topicTitleDivElement.style.display = 'block';

    let topicBorderDivElement = document.querySelector('.new-topic-border');
    topicBorderDivElement.style.display = 'block';

    let topicDivElement = document.getElementsByClassName('theme-content')[0];
    topicDivElement.style.display = 'none';

    let answerCommentDivElement = document.querySelector('.answer-comment');
    answerCommentDivElement.style.display = 'none';

    await loadPosts();
}

async function loadPosts() {
    let topicsDivElement = document.querySelector('.topic-title');
    topicsDivElement.replaceChildren();

    try {
        let response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts`);

        if (response.ok === false) {
            let error = await response.json();
            throw new Error(error.message);
        }

        let posts = await response.json();
        for (let [postId, post] of Object.entries(posts)) {
            let topicContainerDivElement = createElements('div', '', topicsDivElement, {'class': 'topic-container'});
            let topicNameWrapperDivElement = createElements('div', '', topicContainerDivElement, {'class': 'topic-name-wrapper'});
            let topicNameDivElement = createElements('div', '', topicNameWrapperDivElement, {'class': 'topic-name'});
            let anchorElement = createElements('a', '', topicNameDivElement, {'href': '#', 'class': 'normal', 'dataset.id': postId});
            anchorElement.addEventListener('click', showComments);
            createElements('h2', post.title, anchorElement, {});
            let columnsDivElement = createElements('div', '', topicNameDivElement, {'class': 'columns'});
            let divElement = createElements('div', '', columnsDivElement, {});
            let dateParagraphElement = createElements('p', 'Date: ', divElement, {});
            createElements('time', post.createdDate, dateParagraphElement, {});
            let nickNameDivElement = createElements('div', '', divElement, {'class': 'nick-name'});
            let usernameParagraphElement = createElements('p', 'Username: ', nickNameDivElement, {});
            createElements('span', post.username, usernameParagraphElement, {});
        }
    } catch (error) {
        alert(error.message);
    }
}

export function onCancel(event) {
    event.preventDefault();

    let formElement = document.querySelector('form');
    formElement.reset();
}

export async function createPost(event) {
    event.preventDefault();

    let formElement = document.querySelector('form');

    let formData = new FormData(formElement);

    let title = formData.get('topicName').trim();
    let username = formData.get('username').trim();
    let content = formData.get('postText').trim();
    let createdDate = new Date();

    try {
        if (!title) {
            throw new Error('Title is required!');
        } else if (!username) {
            throw new Error('Username is required!');
        } else if (!content) {
            throw new Error('Post is required!');
        }

        let response = await fetch('http://localhost:3030/jsonstore/collections/myboard/posts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title, username, content, createdDate})
        })

        if (response.ok === false) {
            let error = await response.json();
            throw new Error(error.message);
        }

        formElement.reset();
        await loadPosts();

    } catch (error) {
        alert(error.message);
    }
}

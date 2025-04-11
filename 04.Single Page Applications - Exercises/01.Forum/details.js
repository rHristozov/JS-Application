import { createElements } from "./utils.js";

export function showComments(event) {
    let topicTitleDivElement = document.querySelector('.topic-title');
    topicTitleDivElement.style.display = 'none';

    let topicBorderDivElement = document.querySelector('.new-topic-border');
    topicBorderDivElement.style.display = 'none';

    let themeContentDivElement = document.querySelector('.theme-content');
    themeContentDivElement.style.display = 'block';

    let answerCommentDivElement = document.querySelector('.answer-comment');
    answerCommentDivElement.style.display = 'block';

    let postId;

    if (event.target.tagName === 'a') {
        postId = event.target.dataset.id;
    } else {
        postId = event.target.parentElement.getAttribute('dataset.id');
    }

    loadPost(postId);
}

async function loadPost(postId) {
    let formElement = document.querySelectorAll("form")[1];
    formElement.setAttribute('dataset.id', postId);

    try {
        let response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/posts/${postId}`);

        if (response.ok === false) {
            let error = await response.json();
            throw new Error(error.message);
        }

        let post = await response.json();
        let themeContentDivElement = document.querySelector('.theme-content');
        themeContentDivElement.replaceChildren();

        let themeTitleDivElement = createElements('div', '' , themeContentDivElement, {'class': 'theme-title'});
        let themeNameWrapperDivElement = createElements('div', '', themeTitleDivElement, {'class': 'theme-name-wrapper'});
        let themeNameDivElement = createElements('div', '', themeNameWrapperDivElement, {'class': 'theme-name'});
        createElements('h2', post.title, themeNameDivElement, {});

        let commentDivElement = createElements('div', '', themeContentDivElement, {'class': 'comment'});
        let headerDivElement = createElements('div', '', commentDivElement, {'class': 'header'});
        createElements('img', '', headerDivElement, {'src': "./static/profile.png", 'alt': 'avatar'});
        let paragraphElement = createElements('p', '', headerDivElement, {});
        paragraphElement.innerHTML = `<span>${post.username}</span> posted on <time>${post.createdDate}</time>`;
        createElements('p', post.content, headerDivElement, {'class': 'post-content'});

        let comments = await loadComments(postId);

        for (let comment of Object.values(comments)) {
            let userCommentDivElement = createElements('div', '', commentDivElement, {'class': 'user-comment'});
            let themeNameWrapperDivElement = createElements('div', '', userCommentDivElement, {'class': 'theme-name-wrapper'});
            let topicNameDivElement = createElements('div', '', themeNameWrapperDivElement, {'class': 'topic-name'});
            let paragraphElement = createElements('p', '', topicNameDivElement, {});
            paragraphElement.innerHTML = `<strong>${comment.username}</strong> commented on <time>${comment.createdDate}</time>`;
            let postContentDivElement = createElements('div', '', topicNameDivElement, {'class': 'post-content'});
            createElements('p', comment.content, postContentDivElement, {});
        }
    } catch (error) {
        alert(error.message);
    }
}

async function loadComments(postId) {
    try {
        let response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/comments`);

        if (response.ok === false) {
            let error = await response.json();
            throw new Error(error.message);
        }

        let comments = await response.json();

        return Object.values(comments).filter(comment => comment.postId === postId)
    } catch (error) {
        alert(error.message);
    }
}

export async function createComment(event) {
    event.preventDefault();

    let formElement = document.querySelectorAll("form")[1];
    let postId = formElement.getAttribute('dataset.id');

    let formData = new FormData(formElement);
    let username = formData.get('username').trim();
    let content = formData.get('postText').trim();
    let createdDate = new Date();

    try {
        if (!username) {
            throw new Error('Username is required!');
        } else if (!content) {
            throw new Error('Comment is required!');
        }

        let response = await fetch(`http://localhost:3030/jsonstore/collections/myboard/comments`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, content, createdDate, postId})
        });

        if (response.ok === false) {
            let error = await response.json();
            throw new Error(error.message);
        }

        loadPost(postId);
        formElement.reset();
    } catch (error) {
        alert(error.message);
    }
}

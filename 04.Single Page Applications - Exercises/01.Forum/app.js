import { showHome , onCancel, createPost } from "./home.js";
import { createComment } from './details.js';

let homeAnchorElement = document.querySelector('a');
homeAnchorElement.addEventListener('click', showHome);
let buttonsElements = document.querySelectorAll('button');
let cancelButtonElement = buttonsElements[0];
cancelButtonElement.addEventListener('click', onCancel);
let createPostButtonElement = buttonsElements[1];
createPostButtonElement.addEventListener('click', createPost);
let createCommentButtonElement = buttonsElements[2];
createCommentButtonElement.addEventListener('click', createComment);

showHome();

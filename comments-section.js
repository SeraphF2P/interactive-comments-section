"use strict";

import * as data_js_1 from "./data.js";
// import {require} from "./node_modules/nodemon/package.json" ;
// let data = require("./data.js");
const container = document.querySelector('.container');
let clcTimeAgo = (timeId) => {
    while (((Date.now() - timeId) / 60000) < 60) {
        return Math.floor((Date.now() - timeId) / 60000) + ' min Ago';
    }
    while ((Date.now() - timeId) / 3600000 < 60) {
        return Math.floor((Date.now() - timeId) / 3600000) + ' hour Ago';
    }
    while ((Date.now() - timeId) / 86400000 < 24) {
        return Math.floor((Date.now() - timeId) / 86400000) + ' days Ago';
    }
};
function likePuseMinusBtn(e, comment, r) {
    let likes = comment.querySelector('.likes');
    let plus = likes === null || likes === void 0 ? void 0 : likes.querySelector('.likes img:first-child');
    let minus = likes === null || likes === void 0 ? void 0 : likes.querySelector('.likes img:last-child');
    let numOfLikes = comment.querySelector('.likes span');
    let staitment = true;
    if (r == undefined) {
        plus === null || plus === void 0 ? void 0 : plus.addEventListener('click', () => {
            if (staitment) {
                numOfLikes.innerHTML = `${data_js_1.data.comments[e].score + 1}`;
                staitment = false;
            }
        });
        minus === null || minus === void 0 ? void 0 : minus.addEventListener('click', () => {
            if (!staitment) {
                numOfLikes.innerHTML = `${data_js_1.data.comments[e].score}`;
                staitment = true;
            }
        });
    }
    if (r != undefined) {
        plus === null || plus === void 0 ? void 0 : plus.addEventListener('click', () => {
            if (staitment) {
                numOfLikes.innerHTML = `${data_js_1.data.comments[e].replies[r].score + 1}`;
                staitment = false;
            }
        });
        minus === null || minus === void 0 ? void 0 : minus.addEventListener('click', () => {
            if (!staitment) {
                numOfLikes.innerHTML = `${data_js_1.data.comments[e].replies[r].score}`;
                staitment = true;
            }
        });
    }
}
function reloadComment(e) {
    let comment = document.createElement('div');
    comment.classList.add('comment');
    document.querySelector('.comment');
    comment.setAttribute('data-id', data_js_1.data.comments[e].id.toString());
    if (comment != null) {
        container === null || container === void 0 ? void 0 : container.appendChild(comment);
        comment.innerHTML = `<img class="userImg" src="${data_js_1.data.comments[e].user.image.png}" alt="profile photo" />
        <div class="userName">${data_js_1.data.comments[e].user.username}</div>
        <p class="commentDate">${clcTimeAgo(data_js_1.data.comments[e].createdAt)}</p>
        <p class="theComment">${data_js_1.data.comments[e].content}</p>
        <div class="likes"><img src='./images/icon-plus.svg' alt='plus-like'><span>${data_js_1.data.comments[e].score}</span><img src='./images/icon-minus.svg'alt='minus-like'></div>
        <div class="replayBtn"><img src='./images/icon-reply.svg' alt='replay-icon'> Replay</div>`;
    }
    likePuseMinusBtn(e, comment);
    if (data_js_1.data.comments[e].user.username == data_js_1.data.currentUser.username || data_js_1.data.comments[e].user.username == data_js_1.data.currentUser.username) {
        giveUserPermisson(e, comment);
    }
}
function giveUserPermisson(e, comment, r) {
    let replayBtn = comment.querySelector('.replayBtn');
    let edit = document.createElement('div');
    edit.classList.add('edit');
    edit.innerHTML = '<img src=./images/icon-edit.svg alt=edit-icon>Edit';
    replayBtn === null || replayBtn === void 0 ? void 0 : replayBtn.replaceWith(edit);
    let editArea = document.createElement('textarea');
    editArea.classList.add('theComment');
    editArea.classList.add('editArea');
    if (r != undefined) {
        editArea.textContent = data_js_1.data.comments[e].replies[r].content;
    }
    else if (r == undefined) {
        editArea.textContent = data_js_1.data.comments[e].content;
    }
    edit.addEventListener('click', () => {
        let theEditedComment = document.createElement('p');
        theEditedComment.classList.add('theComment');
        let theComment = comment.querySelector('.theComment');
        theComment === null || theComment === void 0 ? void 0 : theComment.replaceWith(editArea);
        edit.addEventListener('click', () => {
            theEditedComment.textContent = editArea.value;
            editArea === null || editArea === void 0 ? void 0 : editArea.replaceWith(theEditedComment);
        });
    });
    const del = document.createElement('div');
    del.classList.add('delete');
    comment.appendChild(del);
    del.innerHTML = '<img src=./images/icon-delete.svg alt=trash-bin-icon>delete';
    del === null || del === void 0 ? void 0 : del.addEventListener('click', () => {
        const delOverLayer = document.querySelector('.delOverLayer');
        delOverLayer === null || delOverLayer === void 0 ? void 0 : delOverLayer.classList.add('show');
        let noDeleteBtn = document.querySelector('.noDeleteBtn');
        noDeleteBtn === null || noDeleteBtn === void 0 ? void 0 : noDeleteBtn.addEventListener('click', () => {
            delOverLayer === null || delOverLayer === void 0 ? void 0 : delOverLayer.classList.remove('show');
        });
        let yesDeleteBtn = document.querySelector('.yesDeleteBtn');
        yesDeleteBtn === null || yesDeleteBtn === void 0 ? void 0 : yesDeleteBtn.addEventListener('click', () => {
            var _a;
            delOverLayer === null || delOverLayer === void 0 ? void 0 : delOverLayer.classList.remove('show');
            (_a = del.closest('.comment')) === null || _a === void 0 ? void 0 : _a.remove();
        });
    });
    let userName = comment.querySelector('.userName');
    if (userName != null && r != undefined) {
        userName.innerHTML = `${data_js_1.data.comments[e].replies[r].user.username}<p class='you'>you</p>`;
    }
    else if (userName != null && r === undefined) {
        userName.innerHTML = `${data_js_1.data.comments[e].user.username}<p class='you'>you</p>`;
    }
}
function checkForReplaies(e, r) {
    if (data_js_1.data.comments[e].replies[r] != null) {
        let comment = document.createElement('div');
        comment.setAttribute('data-id', data_js_1.data.comments[e].replies[r].id.toString());
        comment.classList.add('comment');
        comment.classList.add('commentReplay');
        document.querySelector('.comment');
        let theCommentReplaiedTo = document.querySelector(`[data-id='${data_js_1.data.comments[e].id}']`);
        theCommentReplaiedTo === null || theCommentReplaiedTo === void 0 ? void 0 : theCommentReplaiedTo.insertAdjacentElement("beforeend", comment);
        comment.innerHTML = `
                <img class="userImg " src="${data_js_1.data.comments[e].replies[r].user.image.png}" alt="profile photo" />
                <div class="userName">${data_js_1.data.comments[e].replies[r].user.username}</div>
                <p class="commentDate aReplay">${clcTimeAgo(data_js_1.data.comments[e].replies[r].createdAt)}</p>
                <p class="theComment"'><span class='taged'>@${data_js_1.data.comments[e].replies[r].replyingTo}</span> ${data_js_1.data.comments[e].replies[r].content}</p>
                <div class="likes"><img src='./images/icon-plus.svg'alt='plus-like'><span>${data_js_1.data.comments[e].replies[r].score}</span><img src='./images/icon-minus.svg'alt='minus-like'></div>
                <div class="replayBtn aReplay"><img src=./images/icon-reply.svg alt='replay-icon'> Replay</div>`;
        likePuseMinusBtn(e, comment, r);
        if (data_js_1.data.comments[e].replies[r].user.username == data_js_1.data.currentUser.username || data_js_1.data.comments[e].user.username == data_js_1.data.currentUser.username) {
            giveUserPermisson(e, comment, r);
        }
    }
}
for (let i = 0; i < data_js_1.data.comments.length; i++) {
    reloadComment(i);
    for (let r = 0; r < data_js_1.data.comments[i].replies.length; r++) {
        checkForReplaies(i, r);
    }
}
let userInputSection = document.querySelector('.userInputSection');
let profile = userInputSection === null || userInputSection === void 0 ? void 0 : userInputSection.querySelector('.profile');
profile === null || profile === void 0 ? void 0 : profile.setAttribute('src', data_js_1.data.currentUser.image.png);
let sendBtn = userInputSection === null || userInputSection === void 0 ? void 0 : userInputSection.querySelector('.sendBtn');
let score = 0;
let id = 4;
// data.comments[data.comments.length -1].id;
let text = document === null || document === void 0 ? void 0 : document.querySelector('.commenting');
let content = text === null || text === void 0 ? void 0 : text.value;
let saved = (content, replyingTo) => {
    let createdAt = Date.now();
    id++;
    let pattern = {
        id: id,
        content: content,
        createdAt: createdAt,
        score: score,
        replyingTo: replyingTo,
        user: {
            image: {
                png: data_js_1.data.currentUser.image.png,
                webp: data_js_1.data.currentUser.image.webp
            },
            username: data_js_1.data.currentUser.username
        }
    };
    text.value = '';
    return pattern;
};
sendBtn === null || sendBtn === void 0 ? void 0 : sendBtn.addEventListener('click', () => {
    data_js_1.data.comments.push(saved(content));
    reloadComment(data_js_1.data.comments.length - 1);
});
let replayBtns = document.querySelectorAll('.replayBtn');
replayBtns.forEach(a => {
    a.addEventListener('click', function replayToComment() {
        var _a;
        let userReplaySection = document.createElement('div');
        userReplaySection.classList.add('userReplaySection');
        let pro = document.createElement('img');
        pro.classList.add('profile');
        pro.setAttribute('src', data_js_1.data.currentUser.image.png);
        userReplaySection.appendChild(pro);
        let confirm_Replay = document.createElement('div');
        confirm_Replay.textContent = 'send';
        confirm_Replay.classList.add('sendBtn');
        userReplaySection.appendChild(confirm_Replay);
        let text = document.createElement('textarea');
        text.classList.add('commenting');
        userReplaySection.appendChild(text);
        confirm_Replay.addEventListener('click', () => {
            let thisComment = a.closest('.comment');
            let dataId = Number(thisComment === null || thisComment === void 0 ? void 0 : thisComment.getAttribute('data-id'));
            let replyingTo = data_js_1.data.comments[dataId - 1].user.username;
            let content = text === null || text === void 0 ? void 0 : text.value;
            data_js_1.data.comments[dataId - 1].replies.push(saved(content, replyingTo));
            console.log(saved(text === null || text === void 0 ? void 0 : text.value, replyingTo));
            if (data_js_1.data.comments[dataId - 1].replies.length != null) {
                userReplaySection.remove();
                checkForReplaies(dataId - 1, Number(data_js_1.data.comments[dataId - 1].replies.length - 1));
            }
            else {
                userReplaySection.remove();
                checkForReplaies(dataId - 1, 0);
            }
        });
        (_a = a.closest('.comment')) === null || _a === void 0 ? void 0 : _a.insertAdjacentElement("afterend", userReplaySection);
    });
});

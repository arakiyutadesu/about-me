document.addEventListener('DOMContentLoaded', () => {
    console.log('自己紹介サイトへようこそ！');
});
// const image = document.querySelector('.rotate-image');
// let angle = 0;

// setInterval(() => {
//     angle = (angle + 1) % 360;
//     image.style.transform = `rotate(${angle}deg)`;
// }, 5); // 50ミリ秒ごとに回転
// const image2 = document.querySelector('.rotate-image2');
// let angle2 = 0;

// setInterval(() => {
//     angle2 = (angle2 + 1) % 360;
//     image2.style.transform = `rotate(${angle2}deg)`;
// }, 12); // 50ミリ秒ごとに回転

function rotate(className, interval) {
    const images = document.getElementsByClassName(className);
    console.log(images);
    Array.from(images).forEach(image => {
        let angle = 0;
        setInterval(() => {
            angle = (angle + 1) % 360;
            image.style.transform = `rotate(${angle}deg)`;
        }, interval);
    });
}

rotate("rotate-image", 5);
rotate("rotate-image2", 2);
rotate("rotate-image3", 1);
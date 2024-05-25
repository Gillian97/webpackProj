import { getBlogs } from "./data";
import "./style.css";
import SkyImage from "./assets/images/sky.jpg";
import "./test/date/printDate"; // index 导入是为了webpack发现这个文件

const blogs = getBlogs();

const ul = document.createElement("ul");

// 箭头函数打包后会转换成普通函数
blogs.forEach((blog) => {
  const li = document.createElement("li");
  li.innerText = blog;
  ul.appendChild(li);
});

document.body.appendChild(ul);

// 在js里边创建好了html元素

const skyImage = document.createElement("img");
skyImage.src = SkyImage;
skyImage.width = 200;
skyImage.height = 200;

document.body.prepend(skyImage); // prepend 在body的最前面插入元素

const button = document.createElement("button");
button.innerText = "click me";
document.body.appendChild(button);

// const h1 = document.createElement("h1");
// h1.innerText = "new h1";
// document.body.appendChild(h1);

import data from './data.json';
import Item from './model.todo';

export function App(root) {
  this.datastore = [...data];
  this.nextId = this.datastore.length + 1;

  this.onAdd = () => {
    const now = new Date().toLocaleString();
    this.datastore.push(new Item(`New Item ${this.nextId}`, now));
    this.nextId++;
    this.render();
  }

  this.render = () => {
    const items = this.datastore.map((item, idx) => {
      return `<div class="card">
        <div class="delete" data-id=${idx}>X</div>
        <div class="title" data-id=${idx}>${item.title}</div>
        <span class="label">${item.date}</span>
      </div>`
    })
    this.onItemClick = (event) => {
      const item = this.datastore[parseInt(event.target.dataset.id)];
      //因为this.datastore在外部定义 普通函数形成作用域无法找到定义的datastore
      const title = prompt('Update todo item', item.title);
      if (title) {
        item.title = title;
        this.render();
      }
    }

    this.onDelete = (event) => {
      const items = this.datastore[parseInt(event.target.dataset.id)];
      this.datastore.splice(event.target.dataset.id, 1)
      this.render();
    }
    root.innerHTML = items.join('');

    const deleteButtons = root.getElementsByClassName('delete');
    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons.item(i).addEventListener('click', this.onDelete);
    }

    const titleElems = root.getElementsByClassName('title');
    for (let i = 0; i < titleElems.length; i++) {
      titleElems.item(i).addEventListener('click', this.onItemClick);
    }
  }
}

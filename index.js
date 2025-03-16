let role = null;
let menu = [];
let orders = [];

function selectRole(selectedRole) {
    role = selectedRole;
    document.getElementById('roleSelection').classList.add('hidden');
    if (role === 'executor') {
        document.getElementById('executorLogin').classList.remove('hidden');
    } else {
        showMenu();
    }
}

function checkPassword() {
    const password = document.getElementById('executorPassword').value;
    if (password === '321') {
        document.getElementById('executorLogin').classList.add('hidden');
        showMenu(true);
    } else {
        alert('Неверный пароль!');
    }
}

function showMenu(isExecutor = false) {
    document.getElementById('menu').classList.remove('hidden');
    document.getElementById('menuItems').innerHTML = '';
    menu.forEach((dish, index) => {
        document.getElementById('menuItems').innerHTML += `<div>${dish.name} - ${dish.price}₽ ${role === 'customer' ? `<button onclick='order(${index})'>Заказать</button>` : ''}</div>`;
    });
    if (isExecutor) {
        document.getElementById('addMenuItem').classList.remove('hidden');
        document.getElementById('orders').classList.remove('hidden');
        showOrders();
    }
}

function addMenuItem() {
    const name = document.getElementById('dishName').value;
    const price = document.getElementById('dishPrice').value;
    if (name && price) {
        menu.push({ name, price });
        showMenu(true);
    }
}

function order(index) {
    orders.push({ dish: menu[index].name, price: menu[index].price, status: 'Новый' });
    showOrders();
}

function showOrders() {
    document.getElementById('orderList').innerHTML = '';
    orders.forEach((order, index) => {
        document.getElementById('orderList').innerHTML += `<div>${order.dish} - ${order.price}₽ (${order.status}) ${role === 'executor' ? `<button onclick='confirmOrder(${index})'>Подтвердить</button>` : ''}</div>`;
    });
}

function confirmOrder(index) {
    orders[index].status = 'Подтвержден';
    showOrders();
}

function resetRole() {
    role = null;
    document.getElementById('roleSelection').classList.remove('hidden');
    document.getElementById('executorLogin').classList.add('hidden');
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('orders').classList.add('hidden');
}

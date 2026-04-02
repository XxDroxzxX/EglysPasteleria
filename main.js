/* main.js - lógica compartida con conexión a API */

const API_URL = '/api';

// ---------- helpers para currentUser (solo para sesión local) ----------
function getCurrentUser(){ 
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
}
function setCurrentUser(user){ 
  localStorage.setItem('currentUser', JSON.stringify(user)); 
}
function clearCurrentUser(){ 
  localStorage.removeItem('currentUser'); 
}

// ---------- registro ----------
async function registerUser(form){
  const nombres = form.nombres.value.trim();
  const apellidos = form.apellidos.value.trim();
  const telefono = form.telefono.value.trim();
  const correo = form.correo.value.trim().toLowerCase();
  const direccion = form.direccion.value.trim();
  const contraseña = form.contraseña.value;
  
  if(!nombres || !apellidos || !correo || !contraseña){ 
    alert('Complete los campos obligatorios'); 
    return false; 
  }

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombres, apellidos, telefono, correo, direccion, contraseña })
    });

    const data = await response.json();

    if(data.success) {
      alert('Cuenta creada con éxito. Ahora inicia sesión.');
      window.location.href = '/';
      return true;
    } else {
      alert(data.message || 'Error al registrar usuario');
      return false;
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error de conexión. Verifica que el servidor esté corriendo.');
    return false;
  }
}

// ---------- login ----------
async function loginUser(form){
  const correo = form.usuario.value.trim().toLowerCase();
  const contraseña = form.contraseña.value;

  if(!correo || !contraseña) {
    alert('Complete todos los campos');
    return false;
  }

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ correo, contraseña })
    });

    const data = await response.json();

    if(data.success && data.user) {
      setCurrentUser(data.user);
      window.location.href = 'servicio.html';
      return true;
    } else {
      alert(data.message || 'Usuario o contraseña incorrectos');
      return false;
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error de conexión. Verifica que el servidor esté corriendo.');
    return false;
  }
}

// ---------- mostrar usuario logueado ----------
function displayUserInfo(){
  const user = getCurrentUser();
  const userContainer = document.getElementById('userInfo');
  if(!userContainer) return;
  
  if(user){
    let adminButton = '';
    if(user.rol === 'admin' || user.correo === 'yeisonzero'){
      adminButton = `<button class="admin-btn" onclick="showAdminPanel()">⚙️ Admin</button>`;
    }
    
    userContainer.innerHTML = `
      <div class="user-info">
        <div class="user-avatar">👤</div>
        <div class="user-details">
          <div class="user-name">${user.nombres} ${user.apellidos}</div>
          <div class="user-email">${user.correo}</div>
        </div>
        ${adminButton}
        <button class="logout-btn" onclick="logout()">Salir</button>
      </div>
    `;
  } else {
    userContainer.innerHTML = '';
  }
}

// ---------- Panel de Administración ----------
function showAdminPanel(){
  const modal = document.createElement('div');
  modal.className = 'admin-modal';
  modal.innerHTML = `
    <div class="admin-content">
      <div class="admin-header">
        <h3>Panel de Administración</h3>
        <button class="close-btn" onclick="closeAdminPanel()">✕</button>
      </div>
      <div class="admin-tabs">
        <button class="tab-btn active" onclick="showTab('products')">Productos</button>
        <button class="tab-btn" onclick="showTab('add')">Agregar Producto</button>
      </div>
      <div id="productsTab" class="tab-content active">
        <div id="adminProductsList"></div>
      </div>
      <div id="addTab" class="tab-content">
        <form id="addProductForm" class="admin-form">
          <div class="form-group">
            <label>Tipo:</label>
            <select name="tipo" required>
              <option value="torta">Torta</option>
              <option value="evento">Evento</option>
            </select>
          </div>
          <div class="form-group">
            <label>Nombre:</label>
            <input type="text" name="nombre" required>
          </div>
          <div class="form-group">
            <label>Precio:</label>
            <input type="number" name="precio" step="0.01" required>
          </div>
          <div class="form-group">
            <label>Descripción:</label>
            <textarea name="descripcion"></textarea>
          </div>
          <div class="form-group">
            <label>Imagen (ruta):</label>
            <input type="text" name="imagen" placeholder="img/nombre.jpg">
          </div>
          <button type="submit" class="btn">Agregar Producto</button>
        </form>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  loadAdminProducts();
  
  // Event listener para agregar producto
  document.getElementById('addProductForm').addEventListener('submit', addProduct);
}

function closeAdminPanel(){
  const modal = document.querySelector('.admin-modal');
  if(modal) modal.remove();
}

function showTab(tabName){
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  
  event.target.classList.add('active');
  document.getElementById(tabName + 'Tab').classList.add('active');
}

async function loadAdminProducts(){
  try {
    const response = await fetch(`${API_URL}/productos`);
    const data = await response.json();
    
    if(data.success){
      const container = document.getElementById('adminProductsList');
      container.innerHTML = '<h4>Productos Existentes</h4>';
      
      data.productos.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'admin-product';
        productDiv.innerHTML = `
          <div class="product-info">
            <strong>${product.nombre}</strong> - $${parseFloat(product.precio).toLocaleString()}
            <br><small>${product.tipo} - ${product.descripcion || 'Sin descripción'}</small>
          </div>
          <div class="product-actions">
            <button class="edit-btn" onclick="editProduct(${product.id})">✏️</button>
            <button class="delete-btn" onclick="deleteProduct(${product.id})">🗑️</button>
          </div>
        `;
        container.appendChild(productDiv);
      });
    }
  } catch(error){
    console.error('Error:', error);
  }
}

async function addProduct(e){
  e.preventDefault();
  const formData = new FormData(e.target);
  const product = Object.fromEntries(formData);
  
  try {
    const response = await fetch(`${API_URL}/admin/productos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    
    const data = await response.json();
    if(data.success){
      alert('Producto agregado con éxito');
      e.target.reset();
      showTab('products');
      loadAdminProducts();
    } else {
      alert(data.message || 'Error al agregar producto');
    }
  } catch(error){
    console.error('Error:', error);
    alert('Error de conexión');
  }
}

async function editProduct(id){
  const newName = prompt('Nuevo nombre:');
  if(!newName) return;
  
  const newPrice = prompt('Nuevo precio:');
  if(!newPrice) return;
  
  try {
    const response = await fetch(`${API_URL}/admin/productos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: newName,
        precio: parseFloat(newPrice),
        tipo: 'torta'
      })
    });
    
    const data = await response.json();
    if(data.success){
      alert('Producto actualizado con éxito');
      loadAdminProducts();
    } else {
      alert(data.message || 'Error al actualizar producto');
    }
  } catch(error){
    console.error('Error:', error);
    alert('Error de conexión');
  }
}

async function deleteProduct(id){
  if(!confirm('¿Estás seguro de eliminar este producto?')) return;
  
  try {
    const response = await fetch(`${API_URL}/admin/productos/${id}`, {
      method: 'DELETE'
    });
    
    const data = await response.json();
    if(data.success){
      alert('Producto eliminado con éxito');
      loadAdminProducts();
    } else {
      alert(data.message || 'Error al eliminar producto');
    }
  } catch(error){
    console.error('Error:', error);
    alert('Error de conexión');
  }
}

function logout(){
  clearCurrentUser();
  window.location.href = '/';
}

// ---------- proteger páginas que requieren login ----------
function requireLogin(redirectTo='/'){
  const user = getCurrentUser();
  if(!user){ 
    window.location.href = redirectTo; 
    return false; 
  }
  return true;
}

// ---------- mostrar productos filtrados por tipo ----------
async function renderProducts(containerId, tipo){
  const cont = document.getElementById(containerId);
  if(!cont) return;
  
  cont.innerHTML = '<div class="card">Cargando productos...</div>';

  try {
    const response = await fetch(`${API_URL}/productos?tipo=${tipo}`);
    const data = await response.json();

    if(!data.success) {
      cont.innerHTML = '<div class="card">Error al cargar productos</div>';
      return;
    }

    cont.innerHTML = '';
    
    if(data.productos.length === 0) {
      cont.innerHTML = '<div class="card">No hay productos disponibles</div>';
      return;
    }

    data.productos.forEach(p => {
      const div = document.createElement('div');
      div.className = 'product';
      div.innerHTML = `
        <div class="product-image-container">
          <img src="${p.imagen}" alt="${p.nombre}" onerror="this.style.display='none'"/>
          <div class="product-overlay">
            <div class="cart-icon" onclick="addToCart(${p.id})" title="Añadir al carrito">
              🛒
            </div>
          </div>
        </div>
        <strong>${p.nombre}</strong>
        <div class="product-description">${p.descripcion}</div>
        <div class="space-between" style="margin-top:8px">
          <div class="small"><strong>$${parseFloat(p.precio).toLocaleString()}</strong></div>
          <button class="link-btn" onclick="addToCart(${p.id})">Seleccionar</button>
        </div>
      `;
      cont.appendChild(div);
    });
  } catch (error) {
    console.error('Error:', error);
    cont.innerHTML = '<div class="card">Error de conexión. Verifica que el servidor esté corriendo.</div>';
  }
}

// ---------- carrito ----------
async function addToCart(productId){
  const user = getCurrentUser();
  if(!user) {
    alert('Debes iniciar sesión para agregar productos al carrito');
    window.location.href = '/';
    return;
  }

  try {
    const response = await fetch(`${API_URL}/carrito`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usuario_id: user.id,
        producto_id: productId,
        cantidad: 1
      })
    });

    const data = await response.json();

    if(data.success) {
      window.location.href = 'detalle-pedido.html';
    } else {
      alert(data.message || 'Error al agregar al carrito');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error de conexión. Verifica que el servidor esté corriendo.');
  }
}

async function renderCart(containerId){
  const cont = document.getElementById(containerId);
  if(!cont) return;
  
  const user = getCurrentUser();
  if(!user) {
    cont.innerHTML = '<div class="card">Debes iniciar sesión para ver el carrito</div>';
    return;
  }

  cont.innerHTML = '<div class="card">Cargando carrito...</div>';

  try {
    const response = await fetch(`${API_URL}/carrito/${user.id}`);
    const data = await response.json();

    if(!data.success) {
      cont.innerHTML = '<div class="card">Error al cargar el carrito</div>';
      return;
    }

    cont.innerHTML = '';

    if(data.items.length === 0) {
      cont.innerHTML = '<div class="card">No hay productos en el carrito.</div>';
      return;
    }

    const list = document.createElement('div');
    list.className = 'cart-list';
    
    data.items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <div>${item.nombre} x ${item.cantidad}</div>
        <div>$${item.subtotal.toLocaleString()}</div>
      `;
      list.appendChild(div);
    });

    const tot = document.createElement('div');
    tot.className = 'card';
    tot.innerHTML = `
      <div class="space-between">
        <strong>Total</strong>
        <strong>$${data.total.toLocaleString()}</strong>
      </div>
    `;

    cont.appendChild(list);
    cont.appendChild(tot);
  } catch (error) {
    console.error('Error:', error);
    cont.innerHTML = '<div class="card">Error de conexión. Verifica que el servidor esté corriendo.</div>';
  }
}

// confirmar pedido
async function confirmOrder(){
  const user = getCurrentUser();
  if(!user){ 
    alert('Debes iniciar sesión para confirmar pedido'); 
    window.location.href = '/'; 
    return; 
  }

  try {
    const response = await fetch(`${API_URL}/pedidos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usuario_id: user.id
      })
    });

    const data = await response.json();

    if(data.success) {
      alert('Pedido confirmado con éxito. ¡Gracias!');
      window.location.href = 'servicio.html';
    } else {
      alert(data.message || 'Error al confirmar pedido');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Error de conexión. Verifica que el servidor esté corriendo.');
  }
}

// logout simple
function logout(){
  clearCurrentUser();
  window.location.href = '/';
}

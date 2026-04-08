# 📱 Integración de WhatsApp - Guía de Configuración

## Descripción
Esta funcionalidad permite que los clientes confirmen sus pedidos enviando un mensaje de WhatsApp al número oficial de la pastelería con el detalle completo del pedido.

## 🔧 Configuración

### Paso 1: Configurar el número de WhatsApp

Abre el archivo `.env` en la raíz del proyecto y actualiza:

```env
WHATSAPP_PHONE_NUMBER=573015123456
```

**Reemplaza `573015123456` con el número de WhatsApp real de la pastelería.**

#### Formato del número:
- **Para Colombia**: `57` + el número sin el 0 inicial. Ejemplo:
  - Número: `3015123456` → Código: `573015123456`
  - Número: `3125678901` → Código: `573125678901`

- **Para otros países**, consulta los códigos internacionales:
  - **Argentina**: `54` + número
  - **México**: `52` + número
  - **España**: `34` + número
  - **USA/Canadá**: `1` + número

### Paso 2: Reiniciar el servidor

```bash
npm start
```

## 📋 Flujo de uso

1. El cliente agrega productos al carrito
2. El cliente va a "Detalle Pedido"
3. Hace clic en "Confirmar Pedido"
4. Se abre un **modal** mostrando:
   - Detalle completo del pedido
   - Lista de productos con cantidades y precios
   - Total del pedido
   - Dirección de entrega
   - Botón "📤 Enviar por WhatsApp"

5. Al hacer clic en "Enviar por WhatsApp":
   - Se abre WhatsApp automáticamente
   - Se pre-rellena un mensaje con los detalles del pedido
   - El cliente revisa y envía el mensaje
   - El pedido se confirma automáticamente en la base de datos

## 📝 Estructura del mensaje

El mensaje que se genera incluye:

```
*Hola, soy [Nombre del Cliente]*

*📋 Detalle de mi Pedido:*
━━━━━━━━━━━━━━━━━━━━━

1. [Producto]
   Cantidad: Nx | Valor: $[precio]
   Subtotal: $[subtotal]

2. [Siguiente Producto]
   ...

━━━━━━━━━━━━━━━━━━━━━
*💰 TOTAL: $[totalPedido]*

*📍 Dirección de entrega:*
[Dirección registrada]

*📱 Teléfono:*
[Teléfono registrado]

Confirmo este pedido para mi Pastelería Eglys 🎂
```

## 🔒 Datos que se incluyen

- Nombre y apellido del cliente
- Lista de productos con cantidades
- Precios unitarios y subtotales
- **Total del pedido**
- Dirección de entrega
- Teléfono de contacto

## 💡 Ventajas

✅ **Confirmación directa**: El cliente envía el mensaje directamente al número oficial
✅ **Sin API externa requerida**: Funciona con la API de WhatsApp Web (gratuita)
✅ **Historial en WhatsApp**: Todo queda registrado en el chat
✅ **Confirmación dual**: El cliente confirma por WhatsApp Y el pedido se guarda en la BD
✅ **Detalles automáticos**: El mensaje incluye toda la información del pedido

## 🚀 Próximas mejoras (Opcional)

Si quieres implementar una integración más robusta con **WhatsApp Business API**, necesitarías:

1. Crear una cuenta de negocio en WhatsApp
2. Configurar webhooks para recibir confirmaciones automáticamente
3. Usar credenciales de autenticación para enviar mensajes automáticamente

Por ahora, esta solución de **enlaces de WhatsApp** es la más rápida y no requiere configuración adicional.

## 🆘 Solución de problemas

### "No se abre WhatsApp"
- Verifica que tengas la aplicación de WhatsApp instalada o acceso a https://web.whatsapp.com
- Los números deben incluir el código de país sin `+` ni espacios

### "El mensaje sale cortado"
- Los navegadores tienen límites de URL. Si hay muchos productos, el mensaje se truncará.
- Solución: Los usuarios teléfonos móviles suelen tener menos limitaciones

### "El número no funciona"
- Verifica el formato del número (sin + ni espacios)
- Asegúrate de incluir el código de país correcto
- Prueba el número en https://api.whatsapp.com/send?phone=NUMERO&text=Hola


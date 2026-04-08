# ⚡ Quick Start - WhatsApp Integration

## 🚀 Configuración en 2 minutos

### Paso 1: Editar `.env`

Abre el archivo `.env` y cambia este número:

```env
WHATSAPP_PHONE_NUMBER=573015123456
```

**Reemplázalo por el número de WhatsApp de la pastelería:**
- Sin el `+`
- Sin espacios  
- Con código de país (57 para Colombia)
- Ejemplo: `573015123456` = `+57-301-512-3456`

### Paso 2: Reiniciar servidor

```bash
npm start
```

### ¡Listo! 🎉

---

## 📱 Cómo funciona

```
Cliente en "Detalle Pedido" 
  → Hace clic "Confirmar Pedido"
  → Ve un modal con el detalle del pedido
  → Hace clic "Enviar por WhatsApp" 
  → Se abre WhatsApp con el mensaje pre-llenado
  → Cliente envía el mensaje
  → Pedido se confirma automáticamente
```

---

## 🔗 Códigos de País

Si no es Colombia:

| País | Código |
|------|--------|
| Argentina | 54 |
| México | 52 |
| España | 34 |
| USA/Canadá | 1 |
| Brasil | 55 |
| Chile | 56 |

Formato: `{código}{número sin 0}`

Ejemplo Argentina: `5491112345678`

---

## 🆘 Problemas?

- **No se abre WhatsApp**: Verifica el navegador y que el número sea correcto
- **Número no válido**: Asegúrate de incluir el código de país
- **Mensaje cortado**: Es limitación del navegador, en móvil funciona mejor

---

✨ **¡Disfruta la integración!**

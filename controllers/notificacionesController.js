const Notification = require('../models/Notificacion');

exports.getNotificaciones = async (req, res) => {
    try {
        const notifications = await Notification.find(
          { state: true },
          { title: 1, description: 1, date:1, _id: 0 }
        );
        res.json({msg:'OK',res:notifications});
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
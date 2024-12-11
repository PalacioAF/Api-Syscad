const Notification = require('../models/Notificacion');

exports.getNotificaciones = async (req, res) => {
    try {
        const notifications = await await Notification.find(
            {},
            { title: 1, description: 1, _id: 0 }
          );
        res.json({ notifications });
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}
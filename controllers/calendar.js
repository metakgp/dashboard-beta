exports.getCalendar = (req, res) => {
    res.render('calendar', {
        title: 'In-campus calendar'
    });
};

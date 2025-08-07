module.exports.postDeleteHistory = (req, res) => {
    const { historyId } = req.body;

    if (!req.session.history) {
        return res.status(400).send("No history found.");
    }

    req.session.history = req.session.history.filter(
        item => item.id !== historyId
    );

    res.redirect('/search'); 
};


module.exports.postDelete = (req, res) => {
    const { historyId } = req.body;

    if (!req.session.history1) {
        return res.status(400).send("No history found.");
    }

    req.session.history1 = req.session.history1.filter(
        item => item.id !== historyId
    );

    res.redirect('/searchName'); 
};

module.exports.postDeleteFind = (req, res) => {
    const { historyId } = req.body;

    if (!req.session.history2) {
        return res.status(400).send("No history found.");
    }

    req.session.history2 = req.session.history2.filter(
        item => item.id !== historyId
    );

    res.redirect('/findTotal');
};
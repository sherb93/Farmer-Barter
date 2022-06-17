const { User, Offer, Request } = require("../models");

function renderFormat(dataSet) {
    return dataSet.map(data => {
        console.log("hello?")
        data.get({ plain: true })
    })
}

module.exports = {
    async getPostsByDate(req, res) {
        try {
            const offerData = await Offer.findAll({
                include: [
                    {
                        model: User,
                        attributes: ["username", "email"]
                    }
                ]
            })

            const requestData = await Request.findAll({
                include: [
                    {
                        model: User,
                        attributes: ["username", "email"]
                    }
                ]
            })

            // Clean data up in order to pass to handlebars
            const offers = offerData.map(data => data.get({ plain: true }));
            const requests = requestData.map(data => data.get({ plain: true }));

            // Combine the arrays and organize by date
            const sortedPosts = offers.concat(requests).sort((a, b) => {
                a.createdAt - b.createdAt;
            })

            // Render 'all-offers.handlebars' and pass object of data to the file
            res.render('all-posts', {
                sortedPosts,
                loggedIn: req.session.loggedIn,
                userid: req.session.userid
            })
        }
        catch (err) {
            res.status(500).json({ message: err});
        }
    },

    async getPostsByCropAsc(req, res) {
        try {
            const offerData = await Offer.findAll({
                include: [
                    {
                        model: User,
                        attributes: ["username", "email"]
                    }
                ]
            })

            const requestData = await Request.findAll({
                include: [
                    {
                        model: User,
                        attributes: ["username", "email"]
                    }
                ]
            })

            // Clean data up in order to pass to handlebars
            const offers = offerData.map(data => data.get({ plain: true }));
            const requests = requestData.map(data => data.get({ plain: true }));

            // Helper function to sort by name
            function compare( a, b ) {
                console.log("hello")
                if ( a.crop < b.crop ){
                  return -1;
                }
                if ( a.crop > b.crop ){
                  return 1;
                }
                return 0;
              }
              
            // Concat and sort results by crop name
            const sortedPosts = offers.concat(requests).sort( compare );

            // Render 'all-posts.handlebars' and pass object of data to the file
            res.render('all-posts', {
                sortedPosts,
                loggedIn: req.session.loggedIn,
                userid: req.session.userid
            })
        }
        catch (err) {
            res.status(500).json({ message: err});
        }
    }

}
(function () {

    if (Meteor.isServer) {
        // Global API configuration
        var Api = new Restivus({
            useDefaultAuth: true,
            prettyJson: true,
            defaultHeaders: {
                'Content-Type': 'application/json'
            },
        });

        // Maps to: /api/webhooks/github
        Api.addRoute('webhooks/github', {authRequired: false}, {
            get: function () {
                return {
                    statusCode: 200
                };
            }, post: {
                action: function () {
                    console.log(this.request.headers, this.request.body);
                    return {
                        statusCode: 200
                    };
                }
            }
        });
    }

}).call(this);

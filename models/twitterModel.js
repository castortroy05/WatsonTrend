//var twitterUser;

class twitterUser{
    


    constructor(user) {
        this.username = user.username;
        this.displayName = user.displayName;
    };

setUser(user){

        twitterUser = user;
        console.log('user is set as', user.username);
        console.log('set twitterUser to ', twitterUser);
        return twitterUser;

    }

    

    getUserName(twitterUser){

        console.log('user is ', twitterUser.username);

        this.username = twitterUser.username;
        return username;
    }

}
module.exports = twitterUser;
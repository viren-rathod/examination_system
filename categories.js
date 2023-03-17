const express = require('express');
const mysql = require('mysql2');
const app = express();

const conn = mysql.createConnection({

        host:'localhost',
        user:'root',
        password:'root',
        database:'student'
});

app.set('view engine','ejs');

app.get('/',(req,res)=>{

    let cat_1=[
        {
            'que':'1Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },

        {
            'que':'2Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },

        { 
            'que':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },

        { 
            'que':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },
        {
            'que':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },
        {
            'que':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },

        {
            'que':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        }
    ];
    let cat_2=[
        {
            'que':'22Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },

        {
            'que':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },

        { 
            'que':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },

        { 
            'que':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },
        {
            'que':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },
        {
            'que':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },

        {
            'que':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        }
    ];
    let cat_3=[
        {
            'que':'33Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },

        {
            'que':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },

        { 
            'que':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },

        { 
            'que':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },
        {
            'que':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },
        {
            'que':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },

        {
            'que':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        }
    ];
    let cat_4=[
        {
            'que':'44Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },

        {
            'que':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },

        { 
            'que':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },

        { 
            'que':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },
        {
            'que':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },
        {
            'que':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        },

        {
            'que':'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit officiis tempora, nam voluptatum quam suscipit sapiente laboriosam culpa repellat animi veniam adipisci accusantium enim quisquam quo placeat fugit? Asperiores, voluptate.',
            'A':'lorem i',
            'B':'lorem i',
            'C':'lorem i',
            'D':'lorem i',
        }
    ];
   
    res.render('categories',{cat_1,cat_2,cat_3,cat_4});
})


app.listen(6001,()=>{console.log('running on port 6001...')});

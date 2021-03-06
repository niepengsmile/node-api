const MongoClient = require('mongodb').MongoClient;
const url = require('url')

let products = [{id:1,sex:"women",title:"百搭圆领针织衫",type:"jean",img:"imgs/pc0.jpg",preview:["imgs/pc01.jpg","imgs/pc02.jpg","imgs/pc03.jpg"],abs:"百搭圆领针织衫",desc:"百搭圆领针织衫,时尚的设计，尽显时尚，优雅，气质，精致的裁缝工艺，让您的曲线得到更加优美的展现，静心挑选的面料，让您的身心得到更加舒适的享受",price:100,sale:91,count:9,send:6,hot:true},{id:2,sex:"women",title:"欧根纱简单拼接连衣裙",type:"shirt",img:"imgs/pc1.jpg",preview:["imgs/pc11.jpg","imgs/pc12.jpg","imgs/pc13.jpg"],abs:"欧根纱简单拼接连衣裙",desc:"欧根纱简单拼接连衣裙,时尚的设计，尽显时尚，优雅，气质，精致的裁缝工艺，让您的曲线得到更加优美的展现，静心挑选的面料，让您的身心得到更加舒适的享受",price:100,sale:82,count:95,send:49,hot:true},{id:3,sex:"women",title:"心形V领针织衫",type:"coat",img:"imgs/pc2.jpg",preview:["imgs/pc21.jpg","imgs/pc22.jpg","imgs/pc23.jpg"],abs:"心形V领针织衫",desc:"心形V领针织衫,时尚的设计，尽显时尚，优雅，气质，精致的裁缝工艺，让您的曲线得到更加优美的展现，静心挑选的面料，让您的身心得到更加舒适的享受",price:100,sale:92,count:234,send:88,hot:false},{id:4,sex:"women",title:"羽毛印花短裤",type:"shirt",img:"imgs/pc3.jpg",preview:["imgs/pc31.jpg","imgs/pc32.jpg","imgs/pc33.jpg"],abs:"羽毛印花短裤",desc:"羽毛印花短裤,时尚的设计，尽显时尚，优雅，气质，精致的裁缝工艺，让您的曲线得到更加优美的展现，静心挑选的面料，让您的身心得到更加舒适的享受",price:100,sale:90,count:856,send:62,hot:true},{id:5,sex:"man",title:"休闲方领男士T恤",type:"coat",img:"imgs/pc4.jpg",preview:["imgs/pc41.jpg","imgs/pc42.jpg","imgs/pc43.jpg"],abs:"2018夏季新款简约休闲方领纯色POLO衫男士T恤",desc:"2018夏季新款简约休闲方领纯色POLO衫男士T恤,时尚的设计，尽显时尚，优雅，气质，精致的裁缝工艺，让您的曲线得到更加优美的展现，静心挑选的面料，让您的身心得到更加舒适的享受",price:100,sale:82,count:123,send:13,hot:true},{id:6,sex:"man",title:"束脚休闲长裤",type:"jean",img:"imgs/pc5.jpg",preview:["imgs/pc51.jpg","imgs/pc52.jpg","imgs/pc53.jpg"],abs:"2018新款男士丹宁束脚休闲长裤",desc:"2018新款男士丹宁束脚休闲长裤,时尚的设计，尽显时尚，优雅，气质，精致的裁缝工艺，让您的曲线得到更加优美的展现，静心挑选的面料，让您的身心得到更加舒适的享受",price:100,sale:85,count:892,send:68,hot:false},{id:7,sex:"kid",title:"女宝宝舒适套装",type:"shirt",img:"imgs/pc6.jpg",preview:["imgs/pc61.jpg","imgs/pc62.jpg","imgs/pc63.jpg"],abs:"新款女宝宝欧美系舒适套装",desc:"新款女宝宝欧美系舒适套装,时尚的设计，尽显时尚，优雅，气质，精致的裁缝工艺，让您的曲线得到更加优美的展现，静心挑选的面料，让您的身心得到更加舒适的享受",price:100,sale:78,count:742,send:19,hot:false},{id:8,sex:"kid",title:"男童休闲卫衣套装",type:"coat",img:"imgs/pc7.jpg",preview:["imgs/pc71.jpg","imgs/pc72.jpg","imgs/pc73.jpg"],abs:"南极人3-10岁中大童春款卫衣套装男童连帽卫衣套装男童套装时尚休闲卫衣套装",desc:"南极人3-10岁中大童春款卫衣套装男童连帽卫衣套装男童套装时尚休闲卫衣套装,时尚的设计，尽显时尚，优雅，气质，精致的裁缝工艺，让您的曲线得到更加优美的展现，静心挑选的面料，让您的身心得到更加舒适的享受",price:100,sale:72,count:241,send:59,hot:false},{id:9,sex:"women",title:"圆领雪纺连衣裙",type:"shirt",img:"imgs/pc8.jpg",preview:["imgs/pc81.jpg","imgs/pc82.jpg","imgs/pc83.jpg"],abs:"喇叭袖圆领雪纺连衣裙女中长款荷叶边裙",desc:"betu百图喇叭袖圆领雪纺连衣裙女中长款荷叶边裙2017新款1703T50酒红H2M",price:100,sale:55,count:555,send:27,hot:false},{id:10,sex:"kid",title:"中大童运动裤",type:"coat",img:"imgs/pc9.jpg",preview:["imgs/pc91.jpg","imgs/pc92.jpg","imgs/pc93.jpg"],abs:"大童休闲保暖针织长裤",desc:"唯思凡童装女童春秋装中大童运动裤休闲保暖毛圈针织长裤120-165码",price:88,sale:69,count:536,send:26,hot:false},{id:11,sex:"women",title:"针织韩范女打底衬衫",type:"coat",img:"imgs/pc10.jpg",preview:["imgs/pc101.jpg","imgs/pc102.jpg","imgs/pc103.jpg"],abs:"棉针织宽松女长袖衬衫",desc:"玖姿新品时尚条纹棉针织宽松韩范衬衫女长袖打底衬衣",price:100,sale:37,count:521,send:16,hot:false},{id:12,sex:"women",title:"百搭圆领针织衫",type:"jean",img:"imgs/pc0.jpg",preview:["imgs/pc01.jpg","imgs/pc02.jpg","imgs/pc03.jpg"],abs:"百搭圆领针织衫",desc:"百搭圆领针织衫,时尚的设计，尽显时尚，优雅，气质，精致的裁缝工艺，让您的曲线得到更加优美的展现，静心挑选的面料，让您的身心得到更加舒适的享受",price:100,sale:91,count:9,send:6,hot:false},{id:13,sex:"women",title:"欧根纱简单拼接连衣裙",type:"shirt",img:"imgs/pc1.jpg",preview:["imgs/pc11.jpg","imgs/pc12.jpg","imgs/pc13.jpg"],abs:"欧根纱简单拼接连衣裙",desc:"欧根纱简单拼接连衣裙,时尚的设计，尽显时尚，优雅，气质，精致的裁缝工艺，让您的曲线得到更加优美的展现，静心挑选的面料，让您的身心得到更加舒适的享受",price:100,sale:82,count:95,send:64,hot:false},{id:14,sex:"women",title:"心形V领针织衫",type:"coat",img:"imgs/pc2.jpg",preview:["imgs/pc21.jpg","imgs/pc22.jpg","imgs/pc23.jpg"],abs:"心形V领针织衫",desc:"心形V领针织衫,时尚的设计，尽显时尚，优雅，气质，精致的裁缝工艺，让您的曲线得到更加优美的展现，静心挑选的面料，让您的身心得到更加舒适的享受",price:100,sale:92,count:234,send:58,hot:false},{id:15,sex:"women",title:"羽毛印花短裤",type:"shirt",img:"imgs/pc3.jpg",preview:["imgs/pc31.jpg","imgs/pc32.jpg","imgs/pc33.jpg"],abs:"羽毛印花短裤",desc:"羽毛印花短裤,时尚的设计，尽显时尚，优雅，气质，精致的裁缝工艺，让您的曲线得到更加优美的展现，静心挑选的面料，让您的身心得到更加舒适的享受",price:100,sale:90,count:856,send:36,hot:false},{id:16,sex:"man",title:"休闲方领男士T恤",type:"coat",img:"imgs/pc110.jpg",preview:["imgs/pc111.jpg","imgs/pc112.jpg","imgs/pc113.jpg"],abs:"2018夏季新款简约休闲方领纯色POLO衫男士T恤",desc:"2018夏季新款简约休闲方领纯色POLO衫男士T恤,时尚的设计，尽显时尚，优雅，气质，精致的裁缝工艺，让您的曲线得到更加优美的展现，静心挑选的面料，让您的身心得到更加舒适的享受",price:100,sale:82,count:123,send:34,hot:false},{id:17,sex:"man",title:"束脚休闲长裤",type:"jean",img:"imgs/pc5.jpg",preview:["imgs/pc51.jpg","imgs/pc52.jpg","imgs/pc53.jpg"],abs:"2018新款男士丹宁束脚休闲长裤",desc:"2018新款男士丹宁束脚休闲长裤,时尚的设计，尽显时尚，优雅，气质，精致的裁缝工艺，让您的曲线得到更加优美的展现，静心挑选的面料，让您的身心得到更加舒适的享受",price:100,sale:85,count:892,send:33,hot:true},{id:18,sex:"kid",title:"女宝宝舒适套装",type:"shirt",img:"imgs/pc6.jpg",preview:["imgs/pc61.jpg","imgs/pc62.jpg","imgs/pc63.jpg"],abs:"新款女宝宝欧美系舒适套装",desc:"新款女宝宝欧美系舒适套装,时尚的设计，尽显时尚，优雅，气质，精致的裁缝工艺，让您的曲线得到更加优美的展现，静心挑选的面料，让您的身心得到更加舒适的享受",price:100,sale:78,count:742,send:40,hot:true},{id:19,sex:"kid",title:"男童休闲卫衣套装",type:"coat",img:"imgs/pc7.jpg",preview:["imgs/pc71.jpg","imgs/pc72.jpg","imgs/pc73.jpg"],abs:"南极人3-10岁中大童春款卫衣套装男童连帽卫衣套装男童套装时尚休闲卫衣套装",desc:"南极人3-10岁中大童春款卫衣套装男童连帽卫衣套装男童套装时尚休闲卫衣套装,时尚的设计，尽显时尚，优雅，气质，精致的裁缝工艺，让您的曲线得到更加优美的展现，静心挑选的面料，让您的身心得到更加舒适的享受",price:100,sale:72,count:241,send:23,hot:true},{id:20,sex:"women",title:"圆领雪纺连衣裙",type:"shirt",img:"imgs/pc8.jpg",preview:["imgs/pc81.jpg","imgs/pc82.jpg","imgs/pc83.jpg"],abs:"喇叭袖圆领雪纺连衣裙女中长款荷叶边裙",desc:"betu百图喇叭袖圆领雪纺连衣裙女中长款荷叶边裙2017新款1703T50酒红H2M",price:100,sale:55,count:555,send:61,hot:false},{id:21,sex:"kid",title:"中大童运动裤",type:"coat",img:"imgs/pc9.jpg",preview:["imgs/pc91.jpg","imgs/pc92.jpg","imgs/pc93.jpg"],abs:"大童休闲保暖针织长裤",desc:"唯思凡童装女童春秋装中大童运动裤休闲保暖毛圈针织长裤120-165码",price:88,sale:69,count:536,send:21,hot:false},{id:22,sex:"women",title:"针织韩范女打底衬衫",type:"coat",img:"imgs/pc10.jpg",preview:["imgs/pc101.jpg","imgs/pc102.jpg","imgs/pc103.jpg"],abs:"棉针织宽松女长袖衬衫",desc:"玖姿新品时尚条纹棉针织宽松韩范衬衫女长袖打底衬衣",price:100,sale:66,count:521,send:60,hot:false},{id:23,sex:"kid",title:"中大童运动裤",type:"coat",img:"imgs/pc9.jpg",preview:["imgs/pc91.jpg","imgs/pc92.jpg","imgs/pc93.jpg"],abs:"大童休闲保暖针织长裤",desc:"唯思凡童装女童春秋装中大童运动裤休闲保暖毛圈针织长裤120-165码",price:88,sale:69,count:536,send:55,hot:true},{id:24,sex:"women",title:"针织韩范女打底衬衫",type:"coat",img:"imgs/pc10.jpg",preview:["imgs/pc101.jpg","imgs/pc102.jpg","imgs/pc103.jpg"],abs:"棉针织宽松女长袖衬衫",desc:"玖姿新品时尚条纹棉针织宽松韩范衬衫女长袖打底衬衣",price:100,sale:41,count:521,send:6,hot:false},{id:25,sex:"man",title:"休闲方领男士T恤",type:"coat",img:"imgs/pc110.jpg",preview:["imgs/pc111.jpg","imgs/pc112.jpg","imgs/pc113.jpg"],abs:"2018夏季新款简约休闲方领纯色POLO衫男士T恤",desc:"2018夏季新款简约休闲方领纯色POLO衫男士T恤,时尚的设计，尽显时尚，优雅，气质，精致的裁缝工艺，让您的曲线得到更加优美的展现，静心挑选的面料，让您的身心得到更加舒适的享受",price:99,sale:85,count:53,send:15,hot:true}]
let users=[{user:'niepeng',pwd:'123456',email:'niepeng521@126.com',phone:"17600380719"}]
const dataUrl  =  'mongodb://localhost:27017'

MongoClient.connect(dataUrl,function(err,client){
    if(err){
        console.log( " 数据库连接失败" );
        return;
    }
    console.log("数据库连接成功");
    const db = client.db('nodeapi');
    let insertProduct = new Promise(function(resolve,reject){
        db.collection('product').insertMany(products,function(err,ret){
            if(err){
                reject('数据库写入[product]失败');
                return;
            }
            resolve("数据库写入[product]成功")
        });
    })
    let insertUser = new Promise(function(resolve,reject){
        db.collection('user').insertMany(users,function(err,ret){
            if(err){
                reject('数据库写入[user]失败');
                return;
            }
            resolve("数据库写入[user]成功")
        });
    }) 

    insertProduct.then(function(){
        console.log("数据库写入[product]成功"); 
        return insertUser;
    }).then(function(){
        console.log("数据库写入[user]成功"); 
        client.close();
    }).catch(function(e){
        console.log(e)
    })
})



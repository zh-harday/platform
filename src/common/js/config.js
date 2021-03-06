export function changeDate(value) {
    var year = value.getFullYear()
    var month = value.getMonth() + 1
    var day = value.getDate()
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + day
    }
    return [year, month, day].join('-')
}
export function getDate(value) { //时间戳转换标准时间
    var tt = new Date(value).toLocaleString().replace(/\//g, "-");
    return tt;
}

export function getDateStr(value) { //时间转换时间戳
    var stringTime = value;
    var timestamp2 = Date.parse(new Date(stringTime));
    timestamp2 = timestamp2 / 1000;
    // console.log(timestamp2);
    return timestamp2;
}

export function getSysDate() { //封装获取当前系统时间的方法
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + date.getHours() + seperator2 + date.getMinutes() +
        seperator2 + date.getSeconds();
    return currentdate;
}

// 待测试
export function clearValue(obj) {
    Object.keys(obj).forEach((val, array) => {
        obj[val] = ''
    })
}

export function getNodes(arr) {
    // console.log(arr);
    var nodes = [];
    arr.map(function (node) {
        if (node.parentId === '0') {
            nodes.push(node);
        };
    });
    arr.map(function (node) {
        if (node.parentId !== '0') {
            pushNode(node, nodes)
        }
    });
    // console.log(nodes);
    return nodes
}

function pushNode(node, pNodes) {
    //  alert(111);
    pNodes.map(function (pNode) {
        if (pNode.id == node.parentId) {
            if (!pNode.children) {
                pNode.children = [node];
            } else {
                pNode.children.push(node);
            }
        } else if (pNode.children) {
            pNode.children.map(function (item) {
                if (item.id == node.parentId) {
                    // if(item.menuName == '二级菜单'){
                    //     console.log(node.menuName);
                    // }
                    if (!item.children) {
                        item.children = [node];
                    } else {
                        item.children.push(node);
                    }
                }
            })
        } else {
            pNode.children = [];
        }
    })
}
// function pushNode(node, pNodes) {
//     //  alert(111);
//     let charlds = [];
//     pNodes.map(function (pNode) {
//         // console.log(pNode.children);
//         if (pNode.id == node.parentId) {
//             // console.log('*****:'+ pNode.children);
//             if (!pNode.children) {
//                 // console.log('//////'+pNode);
//                 // alert(111)
//                 pNode.children = [node];
//             } else {
//                 // alert(222)
//                 pNode.children.push(node);
//             }
//         }
//     })
// }

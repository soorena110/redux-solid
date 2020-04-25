import store from "./createStore";



store.dispatch({
    "type": "add/replace_myMap",
    "data": [{"id":"5ea1bd52467b07a35069b669","key":"front","title":"عنوان","description":"توضیییییییییییییییییییییییییحححح"},{"id":"juyjmhkgkhjgk","key":"llouyipiyup","title":"ghjkghjk","description":"vbnmdgfh"}]
});

store.dispatch({
    "type": "add/replace_myMap",
    "data": [{"id":"213123dsaf","key":"front","title":"عنوان","description":"sdafsadfsdaf"},{"id":"5ea1ebc881e7c5f0e8944ab7","key":"fdsf","title":"sdfsdf","description":"fdsaf"}]
});

store.dispatch({
    "type": "add/replace_myMap",
    "data": [{"id":"asdfgxcbxvbsdg","key":"front","title":"sfdgsdfg","description":"32143215123"},{"id":"5ea1ebc881e7c5f0e8944ab7","key":"34254154","title":"2134215","description":"cbvsdgffsd"}]
});


store.dispatch({
    "type": "remove_myMap",
    "data": [{"id":"213123dsaf","key":"front","title":"عنوان","description":"sdafsadfsdaf"},{"id":"5ea1ebc881e7c5f0e8944ab7","key":"fdsf","title":"sdfsdf","description":"fdsaf"}]
});


store.dispatch({
    "type": "remove_myMap",
    "key":["asdfgxcbxvbsdg", "213123dsaf"]
});

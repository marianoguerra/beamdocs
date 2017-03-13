/*globals window, console, document*/
(function () {
    'use strict';
    var index, modToSrc, repoBase, commit, baseUrl;

    function loadIndex(data) {
        var modName, funName, mod, fns, funInfo, line, isPublic, label,
            mods = data.mods;

        index = [];
        modToSrc = {};
        repoBase = data.repository;
        commit = data.commit;
        baseUrl = repoBase + commit + '/';

        for(modName in mods) {
            mod = mods[modName];
            fns = mod.fns;
            modToSrc[modName] = mod.path;

            for(funName in fns) {
                funInfo = fns[funName];
                line = funInfo[0];
                isPublic = !!funInfo[1];
                label = modName + ':' + funName;
                index.push([modName, funName, isPublic, line, label]);
            }
        }

        index.sort(function (a, b) {
            return a[4].localeCompare(b[4]);
        });
    }

    function contains(text, substr) {
        return text.indexOf(substr) !== -1;
    }

    function search(text, onlyPublic) {
        var i, len, entry, results = [];

        for(i = 0, len = index.length; i < len; i += 1) {
            entry = index[i];

            if (onlyPublic && !entry[2]) {
                continue;
            }

            if (contains(entry[1], text)) {
                results.push(entry);
            }
        }

        return results;
    }

    function createResultItem(entry) {
        var modName = entry[0],
            fnName = entry[1],
            isPublic = entry[2],
            line = entry[3],
            label = entry[4],
            node = document.createElement('li'),
            nodeText = document.createTextNode(label);

        node.className = 'fn-result';
        node.dataset.beamModule = modName;
        node.dataset.beamFunction = fnName;
        node.dataset.beamLine = line;

        node.appendChild(nodeText);

        return node;
    }

    function fillResults(results) {
        var resultList = document.getElementById('results'),
            items = document.createElement('ol'),
            i, len, item;

        resultList.innerHTML = '';

        for (i = 0, len = results.length; i < len; i += 1) {
            item = createResultItem(results[i]);
            items.appendChild(item);
        }

        items.addEventListener('click', function (event) {
            var node = event.target,
                module = node.dataset.beamModule,
                line = node.dataset.beamLine,
                sourcePath = modToSrc[module],
                srcUrl = baseUrl + sourcePath + '#L' + line;

            console.log('click', node, sourcePath, module, line);
            window.open(srcUrl, '_blank');
        });
        resultList.appendChild(items);
    }

    function clearResults() {
        fillResults([]);
    }

    function fetchIndex() {
        window.fetch('data/index.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                loadIndex(data);
            })
            .catch(function (error) {
                window.alert("Error fetching data");
                console.error(error);
            });
    }

    function throttle(func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;

        if (!options) {
            options = {};
        }

        var later = function() {
            previous = options.leading === false ? 0 : Date.now();
            timeout = null;
            result = func.apply(context, args);

            if (!timeout) {
                context = args = null;
            }
        };

        return function() {
            var now = Date.now();

            if (!previous && options.leading === false) {
                previous = now;
            }

            var remaining = wait - (now - previous);

            context = this;
            args = arguments;

            if (remaining <= 0 || remaining > wait) {

                if (timeout) {
                    window.clearTimeout(timeout);
                    timeout = null;
                }

                previous = now;
                result = func.apply(context, args);

                if (!timeout) {
                    context = args = null;
                }

            } else if (!timeout && options.trailing !== false) {
                timeout = window.setTimeout(later, remaining);
            }

            return result;
        };
    }

    function init() {
        var searchInput = document.getElementById('search-input'),
            searchPublic= document.getElementById('search-public');

        fetchIndex();

        function doSearch() {
            var onlyPublic = searchPublic.checked,
                text = searchInput.value,
                results = search(text, onlyPublic);

            if (text !== "") {
                console.log("search", text, onlyPublic, index.length, results.length);
                fillResults(results);
            } else {
                clearResults();
            }
        }

        var throttleSearch = throttle(doSearch, 1000);
        searchInput.addEventListener('keyup', throttleSearch);

    }

    window.addEventListener('load', init);
}());

'use strict';

window.initializeFilters = (function (filterElement,oldFilter, cb) {
    var newFilter = filterElement.value;
    
     if (typeof cb === 'function') {
        cb(newFilter, oldFilter);
      }
    
  });




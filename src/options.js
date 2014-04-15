var app = angular.module('app', []);

function lsGet ( key ) {
  if ( localStorage.hasOwnProperty(key) ) {
    var value = localStorage[key];
    return JSON.parse(localStorage[key]);
  }
}

function lsSet ( key, value ) {
  var json = JSON.stringify(value);
  localStorage[key] = stripHashKeyFromJson(json);
}

function stripHashKeyFromJson ( json ) {
  return json.replace(/(,)?\s*"\$\$hashKey"\s*:\s*"[^"]+"\s*(,)?/ig, function ( line, first, last ) {
    if ( first && last ) {
      return ',';
    }
    return '';
  });
}

function RulesCtrl ( $scope, $timeout ) {
  $scope.rules = [];

  var load = $scope.load = function () {
    $scope.rules = lsGet('rules') || [];
  };

  var save = $scope.save = function () {
    lsSet('rules', $scope.rules);
  };

  $scope.ruleTypes = [
    { id: 'url', label: 'Inject Script as URL' },
    { id: 'execute', label: 'Inject Inline Script' }
  ];

  $scope.getRuleLink = function ( rule ) {
    var url = rule.url.replace(/\*/g, '');
    if ( /^http/.test(rule.url) ) {
      return url;
    }
    return 'http://' + url;
  };

  $scope.toggleEnabled = function ( rule ) {
    rule.enabled = !rule.enabled;
    save();
  };

  $scope.addingRule = false;

  $scope.add = function () {
    var rule = $scope.editRule = {};
    // $scope.rules.push(rule);
    $scope.edit(rule);

    $scope.addingRule = true;
  };

  $scope.remove = function ( rule ) {
    if ( confirm('Are you sure you want to delete this rule?') ) {
      _.pull($scope.rules, rule);
      save();
    }
  };

  $scope.edit = function ( rule ) {
    $scope.editRule = _.clone(rule);
    $scope.origRule = rule;

    $scope.editRule.type = $scope.editRule.type || 'url';

    $('#edit-modal').modal({
      backdrop: 'static'
    });
  };

  $scope.showBackupModal = function () {
    $scope.backup.json = stripHashKeyFromJson(JSON.stringify(localStorage));

    $('#backup-modal').modal({
      backdrop: 'static'
    });
  };

  $scope.backup = {
    json: null,
    restore: function () {
      var data = JSON.parse($scope.backup.json);
      for ( var key in localStorage ) {
        if ( localStorage.hasOwnProperty(key) ) {
          delete localStorage[key];
        }
      }
      for ( var key in data ) {
        if ( data.hasOwnProperty(key) ) {
          localStorage[key] = data[key];
        }
      }
      $scope.rules = [];
      $timeout(function () {
        load();
      }, 100);
    }
  };

  $scope.saveRule = function () {
    var rule = $scope.editRule;

    if ( $scope.addingRule ) {
      $scope.rules.push(rule);
      $scope.addingRule = false;
    }

    // if ( rule._add ) {
    //   delete rule._add;
    //   $scope.rules.push(rule);
    // }

    _.merge($scope.origRule, rule);
    save();
  };

  $scope.cancelSaveRule = function () {
    _.pull($scope.rules, $scope.editRule);
  };

  $scope.$watch('editRule', function ( rule ) {
    $scope.canSave = rule && rule.url && rule.content;
  }, true);

  load();
}

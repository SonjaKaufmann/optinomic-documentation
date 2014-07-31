function($scope) {

    // ------------------------------------
    // Init
    // ------------------------------------

    var myscope = $scope.XXX;

    set_nice_birthday();

    $scope.current_directive = {
        "title": "Titel des Modules",
        "description": "Unterüberschrift, 12 Aussagen.",
        "info": $scope.patient.lastName + ' ' + $scope.patient.firstName + ' ( ' + $scope.patient.birthday + ' | ' + $scope.patient.age + ' ):'
    };


    // ------------------------------------
    // Functions
    // ------------------------------------

    function set_nice_birthday() {
        // Calculates and writes Age / Birthday into $sope.patient;
        var today = new Date();
        var birthDate = new Date($scope.patient.birthdate);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if ($scope.patient.birthdate !== null) {
            $scope.patient.birthday = $scope.patient.birthdate.substring(0, 10);
            $scope.patient.age = age;
        } else {
            $scope.patient.birthday = 'unknown';
            $scope.patient.age = '?';
        }
    }

    function roundToOne(num) {
        // Round a Number to 0.X 
        return +(Math.round(num + "e+1") + "e-1");
    }



    // ------------------------------------
    // Data available
    // ------------------------------------
    if (myscope !== undefined) {
        $scope.have_data = true;

        // ---------------------------------------------
        // SORT (ARRAY of Objects) - datestamp ascending
        // Sortings seems not to work properly on IE!
        // ---------------------------------------------
        myscope = myscope.sort(function(a, b) {
            var dateA = new Date(a.datestamp),
                dateB = new Date(b.datestamp)
                return dateA - dateB //sort by date ascending
        });

        // ------------------------------------
        // Loop durch alle Ergebnisse (Messungen)
        // ------------------------------------
        for (var i = 0; i < myscope.length; i++) {

            // Variablen initialisieren

            $scope.scale_ranges = {
                "ranges": [{
                    "from": 0,
                    "to": 8,
                    "result": "Keine Depression"
                }, {
                    "from": 9,
                    "to": 13,
                    "result": "Minimale Depression"
                }, {
                    "from": 14,
                    "to": 19,
                    "result": "Leichte Depression"
                }, {
                    "from": 20,
                    "to": 28,
                    "result": "Mittelschwere Depression"
                }, {
                    "from": 29,
                    "to": 63,
                    "result": "Schwere Depression"
                }]
            };

            // ---------------------------------------
            // DO SOMETHING HERE!
            // ---------------------------------------

        }

    } else {
        // ------------------------------------
        // No Data available
        // ------------------------------------
        $scope.have_data = false;
    }
    // Show $sope in Developer Tools - Console 
    console.log($scope.current_directive.title + ' $scope = ', $scope);
}
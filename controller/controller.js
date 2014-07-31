function($scope) {

    // ------------------------------------
    // Init
    // ------------------------------------

    set_nice_birthday();
    //console.log('Patient', $scope.patient);

    var myscope = $scope.isk;

    $scope.current_directive = {
        "title": "Inventar sozialer Kompetenzen (ISK-K)",
        "description": "Persönliche Verhaltensweisen und Gewohnheiten, 33 Aussagen.",
        "info": $scope.patient.lastName + ' ' + $scope.patient.firstName + ' ( ' + $scope.patient.birthday + ' | ' + $scope.patient.age + ' ):'
    };

    // ------------------------------------
    // Functions
    // ------------------------------------

    function set_nice_birthday() {
        //console.log('set_nice_birthday', $scope.patient.birthdate);
        var today = new Date();
        var birthDate = new Date($scope.patient.birthdate);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        //console.log('age', age);

        if ($scope.patient.birthdate !== null) {
            $scope.patient.birthday = $scope.patient.birthdate.substring(0, 10);
            $scope.patient.age = age;
        } else {
            $scope.patient.birthday = 'unknown';
            $scope.patient.age = '?';
        }
        //console.log('$scope.patient.birthday = ', $scope.patient.birthday);
    }


    // ------------------------------------
    // Data available
    // ------------------------------------
    if (myscope !== undefined) {
        $scope.have_data = true;

        // ---------------------------------------------
        // SORT (ARRAY of Objects) - datestamp ascending
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
            myscope[i].label = {
                "results": {
                    "0": {
                        "question": "Soziale Orientierung",
                        "subquestion": "Ausmass, in dem eine Person anderen Menschen offen und mit positiver Grundhaltung gegenüber tritt.",
                        "stanine": 0,
                        "sum_score": 0
                    },
                    "1": {
                        "question": "Offensivität",
                        "subquestion": "Fähigkeit, aus sich herauszugehen und im Kontakt mit anderen Menschen eigene Interessen aktiv verwirklichen zu können.",
                        "stanine": 0,
                        "sum_score": 0
                    },
                    "2": {
                        "question": "Selbststeuerung",
                        "subquestion": "Fähigkeit eines Menschen, flexibel und rational zu handeln, wobei man sich selbst bewusst als Akteur begreift.",
                        "stanine": 0,
                        "sum_score": 0
                    },
                    "3": {
                        "question": "Reflexibilität",
                        "subquestion": "Fähigkeit einer Person, bei anderen Menschen einen positiven bzw. gewünschten Eindruck zu erzeugen.",
                        "stanine": 0,
                        "sum_score": 0
                    }
                }
            };

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


        }

    } else {
        // ------------------------------------
        // No Data available
        // ------------------------------------
        $scope.have_data = false;
    }
    console.log($scope.current_directive.title + ' $scope = ', $scope);
}
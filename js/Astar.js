function aStar(myMap,startPos,ziel,ctx,walls) {
    var weg = [];
	var suche = [];
	var index = 0;
	var currententry;
	var currententry_id;
	var nb;

	while(typeof gefunden === 'undefined'){
		

		if (index == 0){
			// In der Suche sind nur die ids der Nachbarn gespeichert
			suche.push( [startPos.id] );
		}
		else{
			//Für jede Zahl im Array Suche müssen die Nachbarn ermittelt werden
			//Diese Nachbaren müssen wieder in Suche eingetragen werden, sofern sie nicht bereits vorhanden sind..
			for (var a = 0; a < suche[index-1].length ; a++){
				
			currententry 	 =  null;	
			currententry_id  =  suche[index-1][a];
			currententry	 =	myMap.find(f=> f.id == currententry_id );
			
			if (currententry_id == null){
				continue;
			}
			
			if (currententry != null){
				var temp = currententry.getNachbarn();
				// Hindernisse einbauen
				temp = temp.filter(f=> !walls.includes(f));
				if ( typeof suche[index] === 'undefined'){
					// Nachbarn vom Startpunkt 
					suche[index] = temp;
				}else{

				// Prüfung ob in dem oberen Array[1][2][3] bereits Werte
				// vorhanden sind welche wir später nicht speichern sollen...
				for (var i = 0; i < suche.length ; i++){
					temp = temp.filter(f=> !suche[i].includes(f));
				}

				// Verkettung von 2 Arrays				
				Array.prototype.push.apply(suche[index], temp);
			}
			}
			// Ziel wurde in der Suche gefuden
			gefunden = suche[index].find(f=>f == ziel.id);
			// Suche anzeigen
			showSearch(myMap,suche[index],ctx);
			
			//Rückweg!!!
			//Nun muss vom Ziel aus der Rückweg anhand der Nachbarn gefunden werden
			if (typeof gefunden !== 'undefined'){
				weg.push(ziel.id);
				currententry_id = ziel.id;
				
				for (var w = suche.length; w > 0 ; w--){
					nb = null;
					//console.log(myMap[(currententry_id - 1)].id);
					// id ist nicht die Position im Array daher | id -1 = Position im Array |
					nb = myMap.find( f=> f.id == currententry_id).getNachbarn();
					
					// Schnittmenge herausfinden
					nb = nb.filter( n => suche[w-2].includes(n));
					
					// Löschen der null daten im Array
					nb = nb.filter(function (el) {
					  return el != null;
					});	
					
					if (nb.find(f=> f == startPos.id)){
						weg.push( nb.find(f=> f == startPos.id ));
					}
					else{
						for (var i = 0; i<nb.length;i++){
							if (typeof nb[i] !== 'undefined'){
								weg.push( nb[i] );
								break;
							}
							
						}
					}
					
					if(nb.find(f=> f == startPos.id)){
						gefuden = true ;
						return weg;
					}
					currententry_id = weg[ weg.length - 1] ;
				}
				break;
			}
			
			}
		}	
		index++;
	}
}

function showSearch(myMap,suche,ctx){
	var currentTile;
	
	for(var i = 0 ; i< suche.length;i++){
		if ( suche[i] != null ){
			//currentTile = myMap[suche[i]].setSearch(true,ctx);
			currentTile = myMap.find(f=> f.id == suche[i] ).setSearch(true,ctx);
		}	
	}
	//window.setTimeout(1000);
	
}
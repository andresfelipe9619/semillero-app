const data = [
  ['Antioquia', 'Medellín'],
  ['Antioquia', 'Abejorral'],
  ['Antioquia', 'Abriaquí'],
  ['Antioquia', 'Alejandría'],
  ['Antioquia', 'Amagá'],
  ['Antioquia', 'Amalfi'],
  ['Antioquia', 'Andes'],
  ['Antioquia', 'Angelópolis'],
  ['Antioquia', 'Angostura'],
  ['Antioquia', 'Anorí'],
  ['Santander', 'Chimá'],
  ['Antioquia', 'Anza'],
  ['Antioquia', 'Apartadó'],
  ['Antioquia', 'Arboletes'],
  ['Antioquia', 'Argelia'],
  ['Antioquia', 'Armenia'],
  ['Antioquia', 'Barbosa'],
  ['Antioquia', 'Bello'],
  ['Antioquia', 'Betania'],
  ['Antioquia', 'Betulia'],
  ['Antioquia', 'Ciudad Bolívar'],
  ['Antioquia', 'Briceño'],
  ['Antioquia', 'Buriticá'],
  ['Antioquia', 'Cáceres'],
  ['Antioquia', 'Caicedo'],
  ['Antioquia', 'Caldas'],
  ['Antioquia', 'Campamento'],
  ['Antioquia', 'Cañasgordas'],
  ['Antioquia', 'Caracolí'],
  ['Antioquia', 'Caramanta'],
  ['Antioquia', 'Carepa'],
  ['Sucre', 'Sampués'],
  ['Antioquia', 'Carolina'],
  ['Antioquia', 'Caucasia'],
  ['Antioquia', 'Chigorodó'],
  ['Antioquia', 'Cisneros'],
  ['Antioquia', 'Cocorná'],
  ['Antioquia', 'Concepción'],
  ['Antioquia', 'Concordia'],
  ['Antioquia', 'Copacabana'],
  ['Antioquia', 'Dabeiba'],
  ['Antioquia', 'Don Matías'],
  ['Antioquia', 'Ebéjico'],
  ['Antioquia', 'El Bagre'],
  ['Antioquia', 'Entrerrios'],
  ['Antioquia', 'Envigado'],
  ['Antioquia', 'Fredonia'],
  ['Antioquia', 'Giraldo'],
  ['Antioquia', 'Girardota'],
  ['Antioquia', 'Gómez Plata'],
  ['Casanare', 'Nunchía'],
  ['Antioquia', 'Guadalupe'],
  ['Antioquia', 'Guarne'],
  ['Antioquia', 'Guatapé'],
  ['Antioquia', 'Heliconia'],
  ['Antioquia', 'Hispania'],
  ['Antioquia', 'Itagui'],
  ['Antioquia', 'Ituango'],
  ['Norte de Santander', 'Pamplona'],
  ['Antioquia', 'Jericó'],
  ['Antioquia', 'La Ceja'],
  ['Antioquia', 'La Estrella'],
  ['Antioquia', 'La Pintada'],
  ['Antioquia', 'La Unión'],
  ['Antioquia', 'Liborina'],
  ['Antioquia', 'Maceo'],
  ['Antioquia', 'Marinilla'],
  ['Antioquia', 'Montebello'],
  ['Antioquia', 'Murindó'],
  ['Antioquia', 'Mutatá'],
  ['Antioquia', 'Nariño'],
  ['Antioquia', 'Necoclí'],
  ['Antioquia', 'Nechí'],
  ['Antioquia', 'Olaya'],
  ['Antioquia', 'Peñol'],
  ['Antioquia', 'Peque'],
  ['Antioquia', 'Pueblorrico'],
  ['Antioquia', 'Puerto Berrío'],
  ['Antioquia', 'Puerto Nare'],
  ['Antioquia', 'Puerto Triunfo'],
  ['Antioquia', 'Remedios'],
  ['Antioquia', 'Retiro'],
  ['Antioquia', 'Rionegro'],
  ['Antioquia', 'Sabanalarga'],
  ['Antioquia', 'Sabaneta'],
  ['Antioquia', 'Salgar'],
  ['Cundinamarca', 'Albán'],
  ['Vaupés', 'Yavaraté'],
  ['Antioquia', 'San Francisco'],
  ['Antioquia', 'San Jerónimo'],
  ['Córdoba', 'Montelíbano'],
  ['Putumayo', 'Puerto Asís'],
  ['Antioquia', 'San Luis'],
  ['Antioquia', 'San Pedro'],
  ['Sucre', 'Corozal'],
  ['Antioquia', 'San Rafael'],
  ['Antioquia', 'San Roque'],
  ['Antioquia', 'San Vicente'],
  ['Antioquia', 'Santa Bárbara'],
  ['Nariño', 'Buesaco'],
  ['Antioquia', 'Santo Domingo'],
  ['Antioquia', 'El Santuario'],
  ['Antioquia', 'Segovia'],
  ['Antioquia', 'Sopetrán'],
  ['Antioquia', 'Támesis'],
  ['Antioquia', 'Tarazá'],
  ['Antioquia', 'Tarso'],
  ['Antioquia', 'Titiribí'],
  ['Antioquia', 'Toledo'],
  ['Antioquia', 'Turbo'],
  ['Antioquia', 'Uramita'],
  ['Antioquia', 'Urrao'],
  ['Antioquia', 'Valdivia'],
  ['Antioquia', 'Valparaíso'],
  ['Antioquia', 'Vegachí'],
  ['Antioquia', 'Venecia'],
  ['Casanare', 'Maní'],
  ['Antioquia', 'Yalí'],
  ['Antioquia', 'Yarumal'],
  ['Antioquia', 'Yolombó'],
  ['Antioquia', 'Yondó'],
  ['Antioquia', 'Zaragoza'],
  ['Atlántico', 'Barranquilla'],
  ['Atlántico', 'Baranoa'],
  ['Bolívar', 'El Peñón'],
  ['Atlántico', 'Candelaria'],
  ['Atlántico', 'Galapa'],
  ['Valle del Cauca', 'Tuluá'],
  ['Tolima', 'Casabianca'],
  ['Atlántico', 'Luruaco'],
  ['Atlántico', 'Malambo'],
  ['Atlántico', 'Manatí'],
  ['Cundinamarca', 'Anolaima'],
  ['Atlántico', 'Piojó'],
  ['Atlántico', 'Polonuevo'],
  ['Cundinamarca', 'Chía'],
  ['Nariño', 'San Andrés de Tumaco'],
  ['Atlántico', 'Sabanagrande'],
  ['Atlántico', 'Sabanalarga'],
  ['Atlántico', 'Santa Lucía'],
  ['Atlántico', 'Santo Tomás'],
  ['Atlántico', 'Soledad'],
  ['Atlántico', 'Suan'],
  ['Atlántico', 'Tubará'],
  ['Atlántico', 'Usiacurí'],
  ['Caquetá', 'Milán'],
  ['Santander', 'Capitanejo'],
  ['Bolívar', 'Achí'],
  ['Tolima', 'Anzoátegui'],
  ['Bolívar', 'Arenal'],
  ['Bolívar', 'Arjona'],
  ['Bolívar', 'Arroyohondo'],
  ['Valle del Cauca', 'Florida'],
  ['Bolívar', 'Calamar'],
  ['Bolívar', 'Cantagallo'],
  ['Bolívar', 'Cicuco'],
  ['Bolívar', 'Córdoba'],
  ['Bolívar', 'Clemencia'],
  ['Atlántico', 'Repelón'],
  ['Bolívar', 'El Guamo'],
  ['Antioquia', 'Frontino'],
  ['Bolívar', 'Magangué'],
  ['Bolívar', 'Mahates'],
  ['Bolívar', 'Margarita'],
  ['Bolívar', 'Montecristo'],
  ['Bolívar', 'Mompós'],
  ['Bolívar', 'Morales'],
  ['Bolívar', 'Norosí'],
  ['Bolívar', 'Pinillos'],
  ['Bolívar', 'Regidor'],
  ['Bolívar', 'Río Viejo'],
  ['Bolívar', 'San Estanislao'],
  ['Bolívar', 'San Fernando'],
  ['Cundinamarca', 'El Peñón'],
  ['Norte de Santander', 'Pamplonita'],
  ['Bolívar', 'San Juan Nepomuceno'],
  ['Amazonas', 'Miriti Paraná'],
  ['Casanare', 'Támara'],
  ['Bolívar', 'Santa Catalina'],
  ['Bolívar', 'Santa Rosa'],
  ['Boyacá', 'Tibasosa'],
  ['Bolívar', 'Simití'],
  ['Bolívar', 'Soplaviento'],
  ['Bolívar', 'Talaigua Nuevo'],
  ['Bolívar', 'Tiquisio'],
  ['Bolívar', 'Turbaco'],
  ['Bolívar', 'Turbaná'],
  ['Bolívar', 'Villanueva'],
  ['Cauca', 'Páez'],
  ['Boyacá', 'Tunja'],
  ['Boyacá', 'Almeida'],
  ['Boyacá', 'Aquitania'],
  ['Boyacá', 'Arcabuco'],
  ['Tolima', 'Ibagué'],
  ['Boyacá', 'Berbeo'],
  ['Boyacá', 'Betéitiva'],
  ['Boyacá', 'Boavita'],
  ['Boyacá', 'Boyacá'],
  ['Boyacá', 'Briceño'],
  ['Boyacá', 'Buena Vista'],
  ['Boyacá', 'Busbanzá'],
  ['Boyacá', 'Caldas'],
  ['Boyacá', 'Campohermoso'],
  ['Boyacá', 'Cerinza'],
  ['Boyacá', 'Chinavita'],
  ['Boyacá', 'Chiquinquirá'],
  ['Boyacá', 'Chiscas'],
  ['Boyacá', 'Chita'],
  ['Boyacá', 'Chitaraque'],
  ['Boyacá', 'Chivatá'],
  ['Boyacá', 'Cómbita'],
  ['Boyacá', 'Coper'],
  ['Boyacá', 'Corrales'],
  ['Boyacá', 'Covarachía'],
  ['Boyacá', 'Cubará'],
  ['Boyacá', 'Cucaita'],
  ['Boyacá', 'Cuítiva'],
  ['Boyacá', 'Chíquiza'],
  ['Boyacá', 'Chivor'],
  ['Boyacá', 'Duitama'],
  ['Boyacá', 'El Cocuy'],
  ['Boyacá', 'El Espino'],
  ['Boyacá', 'Firavitoba'],
  ['Boyacá', 'Floresta'],
  ['Boyacá', 'Gachantivá'],
  ['Boyacá', 'Gameza'],
  ['Boyacá', 'Garagoa'],
  ['Boyacá', 'Guacamayas'],
  ['Boyacá', 'Guateque'],
  ['Boyacá', 'Guayatá'],
  ['Boyacá', 'Güicán'],
  ['Boyacá', 'Iza'],
  ['Boyacá', 'Jenesano'],
  ['Boyacá', 'Jericó'],
  ['Boyacá', 'Labranzagrande'],
  ['Boyacá', 'La Capilla'],
  ['Boyacá', 'La Victoria'],
  ['Atlántico', 'Puerto Colombia'],
  ['Nariño', 'Belén'],
  ['Boyacá', 'Macanal'],
  ['Boyacá', 'Maripí'],
  ['Boyacá', 'Miraflores'],
  ['Boyacá', 'Mongua'],
  ['Boyacá', 'Monguí'],
  ['Boyacá', 'Moniquirá'],
  ['Boyacá', 'Muzo'],
  ['Boyacá', 'Nobsa'],
  ['Boyacá', 'Nuevo Colón'],
  ['Boyacá', 'Oicatá'],
  ['Boyacá', 'Otanche'],
  ['Boyacá', 'Pachavita'],
  ['Boyacá', 'Páez'],
  ['Boyacá', 'Paipa'],
  ['Boyacá', 'Pajarito'],
  ['Boyacá', 'Panqueba'],
  ['Boyacá', 'Pauna'],
  ['Boyacá', 'Paya'],
  ['Cundinamarca', 'Sopó'],
  ['Boyacá', 'Pesca'],
  ['Boyacá', 'Pisba'],
  ['Boyacá', 'Puerto Boyacá'],
  ['Boyacá', 'Quípama'],
  ['Boyacá', 'Ramiriquí'],
  ['Boyacá', 'Ráquira'],
  ['Boyacá', 'Rondón'],
  ['Boyacá', 'Saboyá'],
  ['Boyacá', 'Sáchica'],
  ['Boyacá', 'Samacá'],
  ['Boyacá', 'San Eduardo'],
  ['Chocó', 'Carmen del Darien'],
  ['Cundinamarca', 'Gama'],
  ['Boyacá', 'San Mateo'],
  ['Cundinamarca', 'Sasaima'],
  ['Nariño', 'Chachagüí'],
  ['Boyacá', 'Santana'],
  ['Boyacá', 'Santa María'],
  ['Norte de Santander', 'Cúcuta'],
  ['Boyacá', 'Santa Sofía'],
  ['Boyacá', 'Sativanorte'],
  ['Boyacá', 'Sativasur'],
  ['Boyacá', 'Siachoque'],
  ['Boyacá', 'Soatá'],
  ['Boyacá', 'Socotá'],
  ['Boyacá', 'Socha'],
  ['Boyacá', 'Sogamoso'],
  ['Boyacá', 'Somondoco'],
  ['Boyacá', 'Sora'],
  ['Boyacá', 'Sotaquirá'],
  ['Boyacá', 'Soracá'],
  ['Boyacá', 'Susacón'],
  ['Boyacá', 'Sutamarchán'],
  ['Boyacá', 'Sutatenza'],
  ['Boyacá', 'Tasco'],
  ['Boyacá', 'Tenza'],
  ['Boyacá', 'Tibaná'],
  ['Boyacá', 'Tinjacá'],
  ['Boyacá', 'Tipacoque'],
  ['Boyacá', 'Toca'],
  ['Bolívar', 'Cartagena'],
  ['Boyacá', 'Tópaga'],
  ['Boyacá', 'Tota'],
  ['Boyacá', 'Turmequé'],
  ['Antioquia', 'Granada'],
  ['Boyacá', 'Tutazá'],
  ['Boyacá', 'Umbita'],
  ['Boyacá', 'Ventaquemada'],
  ['Boyacá', 'Viracachá'],
  ['Boyacá', 'Zetaquira'],
  ['Caldas', 'Manizales'],
  ['Caldas', 'Aguadas'],
  ['Caldas', 'Anserma'],
  ['Caldas', 'Aranzazu'],
  ['Caldas', 'Belalcázar'],
  ['Caldas', 'Chinchiná'],
  ['Caldas', 'Filadelfia'],
  ['Caldas', 'La Dorada'],
  ['Caldas', 'La Merced'],
  ['Caldas', 'Manzanares'],
  ['Caldas', 'Marmato'],
  ['Caldas', 'Marulanda'],
  ['Caldas', 'Neira'],
  ['Caldas', 'Norcasia'],
  ['Caldas', 'Pácora'],
  ['Caldas', 'Palestina'],
  ['Caldas', 'Pensilvania'],
  ['Caldas', 'Riosucio'],
  ['Caldas', 'Risaralda'],
  ['Caldas', 'Salamina'],
  ['Caldas', 'Samaná'],
  ['Caldas', 'San José'],
  ['Caldas', 'Supía'],
  ['Caldas', 'Victoria'],
  ['Caldas', 'Villamaría'],
  ['Caldas', 'Viterbo'],
  ['Caquetá', 'Florencia'],
  ['Caquetá', 'Albania'],
  ['Magdalena', 'Santa Bárbara de Pinto'],
  ['Bolívar', 'María la Baja'],
  ['Caquetá', 'Curillo'],
  ['Caquetá', 'El Doncello'],
  ['Caquetá', 'El Paujil'],
  ['Caquetá', 'Morelia'],
  ['Caquetá', 'Puerto Rico'],
  ['Caquetá', 'La Montañita'],
  ['Caquetá', 'San Vicente del Caguán'],
  ['Caquetá', 'Solano'],
  ['Caquetá', 'Solita'],
  ['Caquetá', 'Valparaíso'],
  ['Cauca', 'Popayán'],
  ['Cauca', 'Almaguer'],
  ['Cauca', 'Argelia'],
  ['Cauca', 'Balboa'],
  ['Cauca', 'Bolívar'],
  ['Cauca', 'Buenos Aires'],
  ['Cauca', 'Cajibío'],
  ['Cauca', 'Caldono'],
  ['Cauca', 'Caloto'],
  ['Cauca', 'Corinto'],
  ['Cauca', 'El Tambo'],
  ['Cauca', 'Florencia'],
  ['Cauca', 'Guachené'],
  ['Cauca', 'Guapi'],
  ['Cauca', 'Inzá'],
  ['Cauca', 'Jambaló'],
  ['Cauca', 'La Sierra'],
  ['Cauca', 'La Vega'],
  ['Cauca', 'López'],
  ['Cauca', 'Mercaderes'],
  ['Cauca', 'Miranda'],
  ['Cauca', 'Morales'],
  ['Cauca', 'Padilla'],
  ['Cauca', 'Patía'],
  ['Cauca', 'Piamonte'],
  ['Cauca', 'Piendamó'],
  ['Cauca', 'Puerto Tejada'],
  ['Cauca', 'Puracé'],
  ['Cauca', 'Rosas'],
  ['Santander', 'El Peñón'],
  ['Antioquia', 'Jardín'],
  ['Cauca', 'Santa Rosa'],
  ['Cauca', 'Silvia'],
  ['Cauca', 'Sotara'],
  ['Cauca', 'Suárez'],
  ['Cauca', 'Sucre'],
  ['Cauca', 'Timbío'],
  ['Cauca', 'Timbiquí'],
  ['Cauca', 'Toribio'],
  ['Cauca', 'Totoró'],
  ['Cauca', 'Villa Rica'],
  ['Cesar', 'Valledupar'],
  ['Cesar', 'Aguachica'],
  ['Cesar', 'Agustín Codazzi'],
  ['Cesar', 'Astrea'],
  ['Cesar', 'Becerril'],
  ['Cesar', 'Bosconia'],
  ['Cesar', 'Chimichagua'],
  ['Cesar', 'Chiriguaná'],
  ['Cesar', 'Curumaní'],
  ['Cesar', 'El Copey'],
  ['Cesar', 'El Paso'],
  ['Cesar', 'Gamarra'],
  ['Cesar', 'González'],
  ['Cesar', 'La Gloria'],
  ['Valle del Cauca', 'Jamundí'],
  ['Cesar', 'Manaure'],
  ['Cesar', 'Pailitas'],
  ['Cesar', 'Pelaya'],
  ['Cesar', 'Pueblo Bello'],
  ['Chocó', 'Tadó'],
  ['Cesar', 'La Paz'],
  ['Cesar', 'San Alberto'],
  ['Cesar', 'San Diego'],
  ['Cesar', 'San Martín'],
  ['Cesar', 'Tamalameque'],
  ['Córdoba', 'Montería'],
  ['Córdoba', 'Ayapel'],
  ['Córdoba', 'Buenavista'],
  ['Córdoba', 'Canalete'],
  ['Córdoba', 'Cereté'],
  ['Córdoba', 'Chimá'],
  ['Córdoba', 'Chinú'],
  ['Casanare', 'Orocué'],
  ['Córdoba', 'Cotorra'],
  ['Tolima', 'Líbano'],
  ['Córdoba', 'Lorica'],
  ['Córdoba', 'Los Córdobas'],
  ['Córdoba', 'Momil'],
  ['Córdoba', 'Moñitos'],
  ['Córdoba', 'Planeta Rica'],
  ['Córdoba', 'Pueblo Nuevo'],
  ['Córdoba', 'Puerto Escondido'],
  ['Cundinamarca', 'Yacopí'],
  ['Córdoba', 'Purísima'],
  ['Córdoba', 'Sahagún'],
  ['Córdoba', 'San Andrés Sotavento'],
  ['Córdoba', 'San Antero'],
  ['Quindío', 'Calarcá'],
  ['Antioquia', 'Sonsón'],
  ['Norte de Santander', 'El Carmen'],
  ['Córdoba', 'San Pelayo'],
  ['Córdoba', 'Tierralta'],
  ['Córdoba', 'Tuchín'],
  ['Córdoba', 'Valencia'],
  ['Tolima', 'Lérida'],
  ['Cundinamarca', 'Anapoima'],
  ['Cundinamarca', 'Arbeláez'],
  ['Cundinamarca', 'Beltrán'],
  ['Cundinamarca', 'Bituima'],
  ['Cundinamarca', 'Bojacá'],
  ['Cundinamarca', 'Cabrera'],
  ['Cundinamarca', 'Cachipay'],
  ['Cundinamarca', 'Cajicá'],
  ['Cundinamarca', 'Caparrapí'],
  ['Cundinamarca', 'Caqueza'],
  ['Córdoba', 'La Apartada'],
  ['Cundinamarca', 'Chaguaní'],
  ['Cundinamarca', 'Chipaque'],
  ['Cundinamarca', 'Choachí'],
  ['Cundinamarca', 'Chocontá'],
  ['Cundinamarca', 'Cogua'],
  ['Cundinamarca', 'Cota'],
  ['Cundinamarca', 'Cucunubá'],
  ['Cundinamarca', 'El Colegio'],
  ['Cundinamarca', 'El Rosal'],
  ['Cundinamarca', 'Fomeque'],
  ['Cundinamarca', 'Fosca'],
  ['Cundinamarca', 'Funza'],
  ['Cundinamarca', 'Fúquene'],
  ['Cundinamarca', 'Gachala'],
  ['Cundinamarca', 'Gachancipá'],
  ['Cundinamarca', 'Gachetá'],
  ['Bolívar', 'San Cristóbal'],
  ['Cundinamarca', 'Girardot'],
  ['Cundinamarca', 'Granada'],
  ['Cundinamarca', 'Guachetá'],
  ['Cundinamarca', 'Guaduas'],
  ['Cundinamarca', 'Guasca'],
  ['Cundinamarca', 'Guataquí'],
  ['Cundinamarca', 'Guatavita'],
  ['Cundinamarca', 'Fusagasugá'],
  ['Cundinamarca', 'Guayabetal'],
  ['Cundinamarca', 'Gutiérrez'],
  ['Cundinamarca', 'Jerusalén'],
  ['Cundinamarca', 'Junín'],
  ['Cundinamarca', 'La Calera'],
  ['Cundinamarca', 'La Mesa'],
  ['Cundinamarca', 'La Palma'],
  ['Cundinamarca', 'La Peña'],
  ['Cundinamarca', 'La Vega'],
  ['Cundinamarca', 'Lenguazaque'],
  ['Cundinamarca', 'Macheta'],
  ['Cundinamarca', 'Madrid'],
  ['Cundinamarca', 'Manta'],
  ['Cundinamarca', 'Medina'],
  ['Cundinamarca', 'Mosquera'],
  ['Cundinamarca', 'Nariño'],
  ['Cundinamarca', 'Nemocón'],
  ['Cundinamarca', 'Nilo'],
  ['Cundinamarca', 'Nimaima'],
  ['Cundinamarca', 'Nocaima'],
  ['Cundinamarca', 'Venecia'],
  ['Cundinamarca', 'Pacho'],
  ['Cundinamarca', 'Paime'],
  ['Cundinamarca', 'Pandi'],
  ['Cundinamarca', 'Paratebueno'],
  ['Cundinamarca', 'Pasca'],
  ['Cundinamarca', 'Puerto Salgar'],
  ['Cundinamarca', 'Pulí'],
  ['Cundinamarca', 'Quebradanegra'],
  ['Cundinamarca', 'Quetame'],
  ['Cundinamarca', 'Quipile'],
  ['Cundinamarca', 'Apulo'],
  ['Cundinamarca', 'Ricaurte'],
  ['Bolívar', 'Zambrano'],
  ['Cundinamarca', 'San Bernardo'],
  ['Cundinamarca', 'San Cayetano'],
  ['Cundinamarca', 'San Francisco'],
  ['Boyacá', 'La Uvita'],
  ['Cundinamarca', 'Zipaquirá'],
  ['Cundinamarca', 'Sesquilé'],
  ['Cundinamarca', 'Sibaté'],
  ['Cundinamarca', 'Silvania'],
  ['Cundinamarca', 'Simijaca'],
  ['Cundinamarca', 'Soacha'],
  ['Cundinamarca', 'Subachoque'],
  ['Cundinamarca', 'Suesca'],
  ['Cundinamarca', 'Supatá'],
  ['Cundinamarca', 'Susa'],
  ['Cundinamarca', 'Sutatausa'],
  ['Cundinamarca', 'Tabio'],
  ['Quindío', 'Génova'],
  ['Cundinamarca', 'Tausa'],
  ['Cundinamarca', 'Tena'],
  ['Cundinamarca', 'Tenjo'],
  ['Cundinamarca', 'Tibacuy'],
  ['Cundinamarca', 'Tibirita'],
  ['Cundinamarca', 'Tocaima'],
  ['Cundinamarca', 'Tocancipá'],
  ['Cundinamarca', 'Topaipí'],
  ['Cundinamarca', 'Ubalá'],
  ['Cundinamarca', 'Ubaque'],
  ['Tolima', 'Suárez'],
  ['Cundinamarca', 'Une'],
  ['Cundinamarca', 'Útica'],
  ['Meta', 'Castilla la Nueva'],
  ['Cundinamarca', 'Vianí'],
  ['Cundinamarca', 'Villagómez'],
  ['Cundinamarca', 'Villapinzón'],
  ['Cundinamarca', 'Villeta'],
  ['Cundinamarca', 'Viotá'],
  ['Cundinamarca', 'Zipacón'],
  ['Chocó', 'Quibdó'],
  ['Chocó', 'Acandí'],
  ['Chocó', 'Alto Baudo'],
  ['Chocó', 'Atrato'],
  ['Chocó', 'Bagadó'],
  ['Chocó', 'Bahía Solano'],
  ['Chocó', 'Bajo Baudó'],
  ['Boyacá', 'Belén'],
  ['Chocó', 'Bojaya'],
  ['Chocó', 'Unión Panamericana'],
  ['Magdalena', 'Pueblo Viejo'],
  ['Chocó', 'Cértegui'],
  ['Chocó', 'Condoto'],
  ['Putumayo', 'Villagarzón'],
  ['Cundinamarca', 'Facatativá'],
  ['Chocó', 'Juradó'],
  ['Chocó', 'Lloró'],
  ['Chocó', 'Medio Atrato'],
  ['Chocó', 'Medio Baudó'],
  ['Chocó', 'Medio San Juan'],
  ['Chocó', 'Nóvita'],
  ['Chocó', 'Nuquí'],
  ['Chocó', 'Río Iro'],
  ['Chocó', 'Río Quito'],
  ['Chocó', 'Riosucio'],
  ['Córdoba', 'Puerto Libertador'],
  ['Chocó', 'Sipí'],
  ['Chocó', 'Unguía'],
  ['Huila', 'Neiva'],
  ['Huila', 'Acevedo'],
  ['Huila', 'Agrado'],
  ['Huila', 'Aipe'],
  ['Huila', 'Algeciras'],
  ['Huila', 'Altamira'],
  ['Huila', 'Baraya'],
  ['Huila', 'Campoalegre'],
  ['Huila', 'Colombia'],
  ['Huila', 'Elías'],
  ['Huila', 'Garzón'],
  ['Huila', 'Gigante'],
  ['Huila', 'Guadalupe'],
  ['Huila', 'Hobo'],
  ['Huila', 'Iquira'],
  ['Huila', 'Isnos'],
  ['Huila', 'La Argentina'],
  ['Huila', 'La Plata'],
  ['Caldas', 'Marquetalia'],
  ['Huila', 'Nátaga'],
  ['Huila', 'Oporapa'],
  ['Huila', 'Paicol'],
  ['Huila', 'Palermo'],
  ['Huila', 'Palestina'],
  ['Huila', 'Pital'],
  ['Huila', 'Pitalito'],
  ['Huila', 'Rivera'],
  ['Huila', 'Saladoblanco'],
  ['Nariño', 'Arboleda'],
  ['Huila', 'Santa María'],
  ['Huila', 'Suaza'],
  ['Huila', 'Tarqui'],
  ['Huila', 'Tesalia'],
  ['Huila', 'Tello'],
  ['Huila', 'Teruel'],
  ['Huila', 'Timaná'],
  ['Huila', 'Villavieja'],
  ['Huila', 'Yaguará'],
  ['La Guajira', 'Riohacha'],
  ['La Guajira', 'Albania'],
  ['La Guajira', 'Barrancas'],
  ['La Guajira', 'Dibula'],
  ['La Guajira', 'Distracción'],
  ['La Guajira', 'El Molino'],
  ['La Guajira', 'Fonseca'],
  ['La Guajira', 'Hatonuevo'],
  ['La Guajira', 'Maicao'],
  ['La Guajira', 'Manaure'],
  ['La Guajira', 'Uribia'],
  ['La Guajira', 'Urumita'],
  ['La Guajira', 'Villanueva'],
  ['Magdalena', 'Santa Marta'],
  ['Magdalena', 'Algarrobo'],
  ['Magdalena', 'Aracataca'],
  ['Magdalena', 'Ariguaní'],
  ['Magdalena', 'Cerro San Antonio'],
  ['Magdalena', 'Chivolo'],
  ['Magdalena', 'Concordia'],
  ['Magdalena', 'El Banco'],
  ['Magdalena', 'El Piñon'],
  ['Magdalena', 'El Retén'],
  ['Magdalena', 'Fundación'],
  ['Magdalena', 'Guamal'],
  ['Magdalena', 'Nueva Granada'],
  ['Magdalena', 'Pedraza'],
  ['Magdalena', 'Pivijay'],
  ['Magdalena', 'Plato'],
  ['Magdalena', 'Remolino'],
  ['Magdalena', 'Salamina'],
  ['Magdalena', 'San Zenón'],
  ['Magdalena', 'Santa Ana'],
  ['Magdalena', 'Sitionuevo'],
  ['Magdalena', 'Tenerife'],
  ['Magdalena', 'Zapayán'],
  ['Magdalena', 'Zona Bananera'],
  ['Meta', 'Villavicencio'],
  ['Meta', 'Acacias'],
  ['Meta', 'Cabuyaro'],
  ['Meta', 'Cubarral'],
  ['Meta', 'Cumaral'],
  ['Meta', 'El Calvario'],
  ['Meta', 'El Castillo'],
  ['Meta', 'El Dorado'],
  ['Valle del Cauca', 'Buenaventura'],
  ['Meta', 'Granada'],
  ['Meta', 'Guamal'],
  ['Meta', 'Mapiripán'],
  ['Meta', 'Mesetas'],
  ['Meta', 'La Macarena'],
  ['Meta', 'Uribe'],
  ['Meta', 'Lejanías'],
  ['Meta', 'Puerto Concordia'],
  ['Meta', 'Puerto Gaitán'],
  ['Meta', 'Puerto López'],
  ['Meta', 'Puerto Lleras'],
  ['Meta', 'Puerto Rico'],
  ['Meta', 'Restrepo'],
  ['Magdalena', 'Ciénaga'],
  ['Atlántico', 'Ponedera'],
  ['Meta', 'San Juanito'],
  ['Meta', 'San Martín'],
  ['Meta', 'Vista Hermosa'],
  ['Nariño', 'Pasto'],
  ['Nariño', 'Albán'],
  ['Nariño', 'Aldana'],
  ['Nariño', 'Ancuyá'],
  ['Boyacá', 'Tununguá'],
  ['Nariño', 'Barbacoas'],
  ['Boyacá', 'Motavita'],
  ['Córdoba', 'San Bernardo del Viento'],
  ['Nariño', 'Colón'],
  ['Nariño', 'Consaca'],
  ['Nariño', 'Contadero'],
  ['Nariño', 'Córdoba'],
  ['Nariño', 'Cuaspud'],
  ['Nariño', 'Cumbal'],
  ['Nariño', 'Cumbitara'],
  ['Nariño', 'El Charco'],
  ['Nariño', 'El Peñol'],
  ['Nariño', 'El Rosario'],
  ['Chocó', 'Istmina'],
  ['Nariño', 'El Tambo'],
  ['Nariño', 'Funes'],
  ['Nariño', 'Guachucal'],
  ['Nariño', 'Guaitarilla'],
  ['Nariño', 'Gualmatán'],
  ['Nariño', 'Iles'],
  ['Nariño', 'Imués'],
  ['Nariño', 'Ipiales'],
  ['Nariño', 'La Cruz'],
  ['Nariño', 'La Florida'],
  ['Nariño', 'La Llanada'],
  ['Nariño', 'La Tola'],
  ['Nariño', 'La Unión'],
  ['Nariño', 'Leiva'],
  ['Nariño', 'Linares'],
  ['Nariño', 'Los Andes'],
  ['Nariño', 'Magüí'],
  ['Nariño', 'Mallama'],
  ['Nariño', 'Mosquera'],
  ['Nariño', 'Nariño'],
  ['Nariño', 'Olaya Herrera'],
  ['Nariño', 'Ospina'],
  ['Nariño', 'Francisco Pizarro'],
  ['Nariño', 'Policarpa'],
  ['Nariño', 'Potosí'],
  ['Nariño', 'Providencia'],
  ['Nariño', 'Puerres'],
  ['Nariño', 'Pupiales'],
  ['Nariño', 'Ricaurte'],
  ['Nariño', 'Roberto Payán'],
  ['Nariño', 'Samaniego'],
  ['Nariño', 'Sandoná'],
  ['Nariño', 'San Bernardo'],
  ['Nariño', 'San Lorenzo'],
  ['Nariño', 'San Pablo'],
  ['Antioquia', 'Belmira'],
  ['Boyacá', 'Ciénega'],
  ['Nariño', 'Santa Bárbara'],
  ['Nariño', 'Sapuyes'],
  ['Nariño', 'Taminango'],
  ['Nariño', 'Tangua'],
  ['Nariño', 'Santacruz'],
  ['Nariño', 'Túquerres'],
  ['Nariño', 'Yacuanquer'],
  ['Santander', 'Puerto Wilches'],
  ['Santander', 'Puerto Parra'],
  ['Quindío', 'Armenia'],
  ['Quindío', 'Buenavista'],
  ['Quindío', 'Circasia'],
  ['Quindío', 'Córdoba'],
  ['Quindío', 'Filandia'],
  ['Quindío', 'La Tebaida'],
  ['Quindío', 'Montenegro'],
  ['Quindío', 'Pijao'],
  ['Quindío', 'Quimbaya'],
  ['Quindío', 'Salento'],
  ['Risaralda', 'Pereira'],
  ['Risaralda', 'Apía'],
  ['Risaralda', 'Balboa'],
  ['Risaralda', 'Dosquebradas'],
  ['Risaralda', 'Guática'],
  ['Risaralda', 'La Celia'],
  ['Risaralda', 'La Virginia'],
  ['Risaralda', 'Marsella'],
  ['Risaralda', 'Mistrató'],
  ['Risaralda', 'Pueblo Rico'],
  ['Risaralda', 'Quinchía'],
  ['Risaralda', 'Santuario'],
  ['Santander', 'Bucaramanga'],
  ['Santander', 'Aguada'],
  ['Santander', 'Albania'],
  ['Santander', 'Aratoca'],
  ['Santander', 'Barbosa'],
  ['Santander', 'Barichara'],
  ['Santander', 'Barrancabermeja'],
  ['Santander', 'Betulia'],
  ['Santander', 'Bolívar'],
  ['Santander', 'Cabrera'],
  ['Santander', 'California'],
  ['Santander', 'Carcasí'],
  ['Santander', 'Cepitá'],
  ['Santander', 'Cerrito'],
  ['Santander', 'Charalá'],
  ['Santander', 'Charta'],
  ['Santander', 'Chipatá'],
  ['Santander', 'Cimitarra'],
  ['Santander', 'Concepción'],
  ['Santander', 'Confines'],
  ['Santander', 'Contratación'],
  ['Santander', 'Coromoro'],
  ['Santander', 'Curití'],
  ['Santander', 'El Guacamayo'],
  ['Santander', 'El Playón'],
  ['Santander', 'Encino'],
  ['Santander', 'Enciso'],
  ['Santander', 'Florián'],
  ['Santander', 'Floridablanca'],
  ['Santander', 'Galán'],
  ['Santander', 'Gambita'],
  ['Santander', 'Girón'],
  ['Santander', 'Guaca'],
  ['Santander', 'Guadalupe'],
  ['Santander', 'Guapotá'],
  ['Santander', 'Guavatá'],
  ['Santander', 'Güepsa'],
  ['Santander', 'Jesús María'],
  ['Santander', 'Jordán'],
  ['Santander', 'La Belleza'],
  ['Santander', 'Landázuri'],
  ['Santander', 'La Paz'],
  ['Santander', 'Lebríja'],
  ['Santander', 'Los Santos'],
  ['Santander', 'Macaravita'],
  ['Santander', 'Málaga'],
  ['Santander', 'Matanza'],
  ['Santander', 'Mogotes'],
  ['Santander', 'Molagavita'],
  ['Santander', 'Ocamonte'],
  ['Santander', 'Oiba'],
  ['Santander', 'Onzaga'],
  ['Santander', 'Palmar'],
  ['Santander', 'Páramo'],
  ['Santander', 'Piedecuesta'],
  ['Santander', 'Pinchote'],
  ['Santander', 'Puente Nacional'],
  ['Santander', 'Rionegro'],
  ['Santander', 'San Andrés'],
  ['Santander', 'San Gil'],
  ['Santander', 'San Joaquín'],
  ['Santander', 'San Miguel'],
  ['Santander', 'Santa Bárbara'],
  ['Santander', 'Simacota'],
  ['Santander', 'Socorro'],
  ['Santander', 'Suaita'],
  ['Santander', 'Sucre'],
  ['Santander', 'Suratá'],
  ['Santander', 'Tona'],
  ['Santander', 'Vélez'],
  ['Santander', 'Vetas'],
  ['Santander', 'Villanueva'],
  ['Santander', 'Zapatoca'],
  ['Sucre', 'Sincelejo'],
  ['Sucre', 'Buenavista'],
  ['Sucre', 'Caimito'],
  ['Sucre', 'Coloso'],
  ['Sucre', 'Coveñas'],
  ['Sucre', 'Chalán'],
  ['Sucre', 'El Roble'],
  ['Sucre', 'Galeras'],
  ['Sucre', 'Guaranda'],
  ['Sucre', 'La Unión'],
  ['Sucre', 'Los Palmitos'],
  ['Sucre', 'Majagual'],
  ['Sucre', 'Morroa'],
  ['Sucre', 'Ovejas'],
  ['Sucre', 'Palmito'],
  ['Sucre', 'San Benito Abad'],
  ['Sucre', 'San Marcos'],
  ['Sucre', 'San Onofre'],
  ['Sucre', 'San Pedro'],
  ['Sucre', 'Sucre'],
  ['Sucre', 'Tolú Viejo'],
  ['Tolima', 'Alpujarra'],
  ['Tolima', 'Alvarado'],
  ['Tolima', 'Ambalema'],
  ['Tolima', 'Armero'],
  ['Tolima', 'Ataco'],
  ['Tolima', 'Cajamarca'],
  ['Tolima', 'Chaparral'],
  ['Tolima', 'Coello'],
  ['Tolima', 'Coyaima'],
  ['Tolima', 'Cunday'],
  ['Tolima', 'Dolores'],
  ['Tolima', 'Espinal'],
  ['Tolima', 'Falan'],
  ['Tolima', 'Flandes'],
  ['Tolima', 'Fresno'],
  ['Tolima', 'Guamo'],
  ['Tolima', 'Herveo'],
  ['Tolima', 'Honda'],
  ['Tolima', 'Icononzo'],
  ['Tolima', 'Mariquita'],
  ['Tolima', 'Melgar'],
  ['Tolima', 'Murillo'],
  ['Tolima', 'Natagaima'],
  ['Tolima', 'Ortega'],
  ['Tolima', 'Palocabildo'],
  ['Tolima', 'Piedras'],
  ['Tolima', 'Planadas'],
  ['Tolima', 'Prado'],
  ['Tolima', 'Purificación'],
  ['Tolima', 'Rio Blanco'],
  ['Tolima', 'Roncesvalles'],
  ['Tolima', 'Rovira'],
  ['Tolima', 'Saldaña'],
  ['Tolima', 'Santa Isabel'],
  ['Tolima', 'Venadillo'],
  ['Tolima', 'Villahermosa'],
  ['Tolima', 'Villarrica'],
  ['Arauca', 'Arauquita'],
  ['Arauca', 'Cravo Norte'],
  ['Arauca', 'Fortul'],
  ['Arauca', 'Puerto Rondón'],
  ['Arauca', 'Saravena'],
  ['Arauca', 'Tame'],
  ['Arauca', 'Arauca'],
  ['Casanare', 'Yopal'],
  ['Casanare', 'Aguazul'],
  ['Casanare', 'Chámeza'],
  ['Casanare', 'Hato Corozal'],
  ['Casanare', 'La Salina'],
  ['Casanare', 'Monterrey'],
  ['Casanare', 'Pore'],
  ['Casanare', 'Recetor'],
  ['Casanare', 'Sabanalarga'],
  ['Casanare', 'Sácama'],
  ['Casanare', 'Tauramena'],
  ['Casanare', 'Trinidad'],
  ['Casanare', 'Villanueva'],
  ['Putumayo', 'Mocoa'],
  ['Putumayo', 'Colón'],
  ['Putumayo', 'Orito'],
  ['Putumayo', 'Puerto Caicedo'],
  ['Putumayo', 'Puerto Guzmán'],
  ['Putumayo', 'Leguízamo'],
  ['Putumayo', 'Sibundoy'],
  ['Putumayo', 'San Francisco'],
  ['Putumayo', 'San Miguel'],
  ['Putumayo', 'Santiago'],
  ['Amazonas', 'Leticia'],
  ['Amazonas', 'El Encanto'],
  ['Amazonas', 'La Chorrera'],
  ['Amazonas', 'La Pedrera'],
  ['Amazonas', 'La Victoria'],
  ['Amazonas', 'Puerto Arica'],
  ['Amazonas', 'Puerto Nariño'],
  ['Amazonas', 'Puerto Santander'],
  ['Amazonas', 'Tarapacá'],
  ['Guainía', 'Inírida'],
  ['Guainía', 'Barranco Minas'],
  ['Guainía', 'Mapiripana'],
  ['Guainía', 'San Felipe'],
  ['Guainía', 'Puerto Colombia'],
  ['Guainía', 'La Guadalupe'],
  ['Guainía', 'Cacahual'],
  ['Guainía', 'Pana Pana'],
  ['Guainía', 'Morichal'],
  ['Vaupés', 'Mitú'],
  ['Vaupés', 'Caruru'],
  ['Vaupés', 'Pacoa'],
  ['Vaupés', 'Taraira'],
  ['Vaupés', 'Papunaua'],
  ['Vichada', 'Puerto Carreño'],
  ['Vichada', 'La Primavera'],
  ['Vichada', 'Santa Rosalía'],
  ['Vichada', 'Cumaribo'],
  ['Caquetá', 'San José del Fragua'],
  ['Meta', 'Barranca de Upía'],
  ['Santander', 'Palmas del Socorro'],
  ['Cundinamarca', 'San Juan de Río Seco'],
  ['Atlántico', 'Juan de Acosta'],
  ['Meta', 'Fuente de Oro'],
  ['Casanare', 'San Luis de Gaceno'],
  ['Chocó', 'El Litoral del San Juan'],
  ['Cundinamarca', 'Villa de San Diego de Ubate'],
  ['Bolívar', 'Barranco de Loba'],
  ['Boyacá', 'Togüí'],
  ['Bolívar', 'Santa Rosa del Sur'],
  ['Chocó', 'El Cantón del San Pablo'],
  ['Boyacá', 'Villa de Leyva'],
  ['Magdalena', 'San Sebastián de Buenavista'],
  ['Boyacá', 'Paz de Río'],
  ['Bolívar', 'Hatillo de Loba'],
  ['Magdalena', 'Sabanas de San Angel'],
  ['Guaviare', 'Calamar'],
  ['Cesar', 'Río de Oro'],
  ['Antioquia', 'San Pedro de Uraba'],
  ['Guaviare', 'San José del Guaviare'],
  ['Boyacá', 'Santa Rosa de Viterbo'],
  ['Cauca', 'Santander de Quilichao'],
  ['Guaviare', 'Miraflores'],
  ['Antioquia', 'Santafé de Antioquia'],
  ['Meta', 'San Carlos de Guaroa'],
  ['Atlántico', 'Palmar de Varela'],
  ['Antioquia', 'Santa Rosa de Osos'],
  ['Antioquia', 'San Andrés de Cuerquía'],
  ['Tolima', 'Valle de San Juan'],
  ['Santander', 'San Vicente de Chucurí'],
  ['Santander', 'San José de Miranda'],
  ['Archipiélago de San Andrés, Providencia y Santa Catalina', 'Providencia'],
  ['Risaralda', 'Santa Rosa de Cabal'],
  ['Cundinamarca', 'Guayabal de Siquima'],
  ['Caquetá', 'Belén de Los Andaquies'],
  ['Casanare', 'Paz de Ariporo'],
  ['Santander', 'Santa Helena del Opón'],
  ['Boyacá', 'San Pablo de Borbur'],
  ['La Guajira', 'La Jagua del Pilar'],
  ['Cesar', 'La Jagua de Ibirico'],
  ['Sucre', 'San Luis de Sincé'],
  ['Boyacá', 'San Luis de Gaceno'],
  ['Bolívar', 'El Carmen de Bolívar'],
  ['Chocó', 'El Carmen de Atrato'],
  ['Sucre', 'San Juan de Betulia'],
  ['Magdalena', 'Pijiño del Carmen'],
  ['Antioquia', 'Vigía del Fuerte'],
  ['Bolívar', 'San Martín de Loba'],
  ['Bolívar', 'Altos del Rosario'],
  ['Tolima', 'Carmen de Apicala'],
  ['Cundinamarca', 'San Antonio del Tequendama'],
  ['Santander', 'Sabana de Torres'],
  ['Guaviare', 'El Retorno'],
  ['Córdoba', 'San José de Uré'],
  ['Nariño', 'San Pedro de Cartago'],
  ['Atlántico', 'Campo de La Cruz'],
  ['Meta', 'San Juan de Arama'],
  ['Antioquia', 'San José de La Montaña'],
  ['Caquetá', 'Cartagena del Chairá'],
  ['Chocó', 'San José del Palmar'],
  ['Cundinamarca', 'Agua de Dios'],
  ['Bolívar', 'San Jacinto del Cauca'],
  ['Huila', 'San Agustín'],
  ['Nariño', 'El Tablón de Gómez'],
  ['Archipiélago de San Andrés, Providencia y Santa Catalina', 'San Andrés'],
  ['Boyacá', 'San José de Pare'],
  ['Putumayo', 'Valle de Guamez'],
  ['Bolívar', 'San Pablo de Borbur'],
  ['Sucre', 'Santiago de Tolú'],
  ['Cundinamarca', 'Carmen de Carupa'],
  ['Córdoba', 'Ciénaga de Oro'],
  ['Antioquia', 'San Juan de Urabá'],
  ['La Guajira', 'San Juan del Cesar'],
  ['Santander', 'El Carmen de Chucurí'],
  ['Antioquia', 'El Carmen de Viboral'],
  ['Risaralda', 'Belén de Umbría'],
  ['Chocó', 'Belén de Bajira'],
  ['Santander', 'Valle de San José'],
  ['Tolima', 'San Luis'],
  ['Boyacá', 'San Miguel de Sema'],
  ['Tolima', 'San Antonio'],
  ['Santander', 'San Benito'],
  ['Cundinamarca', 'Vergara'],
  ['Córdoba', 'San Carlos'],
  ['Amazonas', 'Puerto Alegría'],
  ['Santander', 'Hato'],
  ['Bolívar', 'San Jacinto'],
  ['Cauca', 'San Sebastián'],
  ['Antioquia', 'San Carlos'],
  ['Boyacá', 'Tuta'],
  ['Norte de Santander', 'Silos'],
  ['Norte de Santander', 'Cácota'],
  ['Valle del Cauca', 'El Dovio'],
  ['Norte de Santander', 'Toledo'],
  ['Valle del Cauca', 'Roldanillo'],
  ['Norte de Santander', 'Mutiscua'],
  ['Valle del Cauca', 'Argelia'],
  ['Norte de Santander', 'El Zulia'],
  ['Norte de Santander', 'Salazar'],
  ['Valle del Cauca', 'Sevilla'],
  ['Valle del Cauca', 'Zarzal'],
  ['Norte de Santander', 'Cucutilla'],
  ['Valle del Cauca', 'El Cerrito'],
  ['Valle del Cauca', 'Cartago'],
  ['Valle del Cauca', 'Caicedonia'],
  ['Norte de Santander', 'Puerto Santander'],
  ['Norte de Santander', 'Gramalote'],
  ['Valle del Cauca', 'El Cairo'],
  ['Norte de Santander', 'El Tarra'],
  ['Valle del Cauca', 'La Unión'],
  ['Valle del Cauca', 'Restrepo'],
  ['Norte de Santander', 'Teorama'],
  ['Valle del Cauca', 'Dagua'],
  ['Norte de Santander', 'Arboledas'],
  ['Valle del Cauca', 'Guacarí'],
  ['Norte de Santander', 'Lourdes'],
  ['Valle del Cauca', 'Ansermanuevo'],
  ['Norte de Santander', 'Bochalema'],
  ['Valle del Cauca', 'Bugalagrande'],
  ['Norte de Santander', 'Convención'],
  ['Norte de Santander', 'Hacarí'],
  ['Valle del Cauca', 'La Victoria'],
  ['Norte de Santander', 'Herrán'],
  ['Valle del Cauca', 'Ginebra'],
  ['Valle del Cauca', 'Yumbo'],
  ['Valle del Cauca', 'Obando'],
  ['Norte de Santander', 'Tibú'],
  ['Norte de Santander', 'San Cayetano'],
  ['Norte de Santander', 'San Calixto'],
  ['Valle del Cauca', 'Bolívar'],
  ['Norte de Santander', 'La Playa'],
  ['Valle del Cauca', 'Cali'],
  ['Valle del Cauca', 'San Pedro'],
  ['Valle del Cauca', 'Guadalajara de Buga'],
  ['Norte de Santander', 'Chinácota'],
  ['Norte de Santander', 'Ragonvalia'],
  ['Norte de Santander', 'La Esperanza'],
  ['Norte de Santander', 'Villa del Rosario'],
  ['Norte de Santander', 'Chitagá'],
  ['Valle del Cauca', 'Calima'],
  ['Norte de Santander', 'Sardinata'],
  ['Valle del Cauca', 'Andalucía'],
  ['Valle del Cauca', 'Pradera'],
  ['Norte de Santander', 'Abrego'],
  ['Norte de Santander', 'Los Patios'],
  ['Norte de Santander', 'Ocaña'],
  ['Norte de Santander', 'Bucarasica'],
  ['Valle del Cauca', 'Yotoco'],
  ['Valle del Cauca', 'Palmira'],
  ['Valle del Cauca', 'Riofrío'],
  ['Norte de Santander', 'Santiago'],
  ['Valle del Cauca', 'Alcalá'],
  ['Valle del Cauca', 'Versalles'],
  ['Norte de Santander', 'Labateca'],
  ['Norte de Santander', 'Cachirá'],
  ['Norte de Santander', 'Villa Caro'],
  ['Norte de Santander', 'Durania'],
  ['Valle del Cauca', 'El Águila'],
  ['Valle del Cauca', 'Toro'],
  ['Valle del Cauca', 'Candelaria'],
  ['Valle del Cauca', 'La Cumbre'],
  ['Valle del Cauca', 'Ulloa'],
  ['Valle del Cauca', 'Trujillo'],
  ['Valle del Cauca', 'Vijes'],
].sort(([, a], [, b]) => a.localeCompare(b));

const citiesGroupByDepartment = data.reduce((acc, item) => {
  const [department, city] = item;
  const city2add = { value: city, label: city };
  if (acc[department]) acc[department].push(city2add);
  else acc[department] = [city2add];
  return acc;
}, {});

const orderedDepartments = Object.keys(citiesGroupByDepartment)
  .sort()
  .reduce((acc, key) => {
    acc[key] = citiesGroupByDepartment[key];
    return acc;
  }, {});

const departments = Object.keys(orderedDepartments).map(city => ({
  value: city,
  label: city,
}));

const communes = Array.from({ length: 21 }, (_, i) => i + 1).map(commune => ({
  value: commune,
  label: commune,
}));

export { departments, communes, citiesGroupByDepartment };

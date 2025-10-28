Ejercicio 1

Generalización simbólica: En JavaScript, todo es un objeto y la herencia se basa en prototipos, no en clases. Los objetos pueden crear nuevos objetos a partir de otros usando Object.create() o funciones constructoras. La herencia funciona por una cadena de prototipos, y se pueden agregar o modificar propiedades en tiempo de ejecución, lo que vuelve el lenguaje muy dinámico y flexible.

Creencias de los profesionales: Los desarrolladores valoran de JavaScript su flexibilidad, dinamismo y simplicidad. Permite modificar objetos fácilmente sin estructuras rígidas, adaptándose bien al desarrollo web. Se cree que su modelo basado en prototipos hace al lenguaje más ágil y expresivo que otros con herencia tradicional.

Ejercicio 4

Clases

Se utilizaron clases para representar las entidades principales del sistema. Por un lado, la clase Tarea modela una tarea individual con sus atributos (como descripción o estado). Por otro lado, la clase GestorTareas se encarga de administrar el conjunto de tareas, permitiendo agregar, eliminar o marcar tareas como completadas. De esta forma, cada clase cumple una función específica dentro del programa.

Encapsulamiento

Las propiedades y métodos de cada clase están bien definidos y se accede a ellos solo a través de funciones públicas. Esto evita la manipulación directa de los datos y garantiza que las modificaciones se realicen de manera controlada. Por ejemplo, para modificar una tarea no se accede directamente a sus datos, sino que se hace mediante métodos del GestorTareas.

Abstracción

La abstracción permitió ocultar los detalles del funcionamiento interno de las clases, dejando visibles solo los métodos necesarios para interactuar con ellas. Así, el usuario puede manejar tareas sin preocuparse por cómo se almacenan o gestionan internamente.

Instanciación

Cada vez que se crea una nueva tarea con new Tarea(), se genera un objeto independiente con su propio estado. Esto facilita la creación de múltiples tareas sin que interfieran entre sí.

Herencia (no aplicada)

En este trabajo no fue necesario implementar herencia, ya que las clases tienen responsabilidades bien definidas y no dependen unas de otras. De todas formas, en una versión más compleja del sistema se podría aplicar para crear diferentes tipos de tareas, por ejemplo TareaImportante o TareaRecurrente.

Polimorfismo (no aplicado)

Tampoco se utilizó polimorfismo, ya que no existen subclases con comportamientos distintos. Sin embargo, este concepto podría aplicarse en el futuro si se definieran distintos tipos de tareas con métodos adaptados a cada caso.

'use strict';
/**
 * @ngdoc function
 * @name parte2App.controller:Controlador2Ctrl
 * @description
 * # Controlador2Ctrl
 * Controller of the parte2App
 */

angular.module('pmcApp')
  .controller('ControladorCtrl', function ($scope, $http) {
    
    $scope.posts = [];
    $scope.comentario={};
    $scope.usuarioNuevo={};
    $scope.logueo = {};
    $scope.materiaBuscada="";
    $scope.materias=[];
    $scope.monitoresresultado = [];
    $scope.contadorResultados = 0;
    $scope.resultadosRandom = [];
    $scope.monithor = false;
    $scope.watachi = false;
    $scope.cantidadTutorias = 0;
    $scope.tutoriasAgendadas = [];
    $scope.tutoriaAgendada = {};
    
    $http.get("http://localhost:9000/materias")
    .success(function(data){
        materias = data;
    })
    
    .error(function(error){
        console.log(error);
    })
    
    $scope.agregar =function(){
        $scope.posts.push($scope.comentario);
        $scope.comentario = {};
    }
    
    $scope.buscarTutores = function(){
        $scope.materiaBuscada = $scope.materiaBuscada.toUpperCase();
        $scope.materiaBuscada = $scope.materiaBuscada.trim();
        $scope.monitoresresultado = [];
        $scope.contadorResultados = 0;
        $scope.resultadosRandom=[];
        $scope.random1 = {};
        $scope.watachi=false;
        $scope.monithor=false;
        $http.get("http://localhost:9000/estudiantes")
        .success(function(data){
            $scope.todos = data;
            for(var i=0; i<$scope.todos.length; i++)
            {
                $scope.materiasx = $scope.todos[i].materias;
                console.log($scope.materiasx);
                if($scope.materiasx.length != 0)
                {
                    for(var j = 0; j<$scope.materiasx.length;j++)
                    {
                    $scope.materiaActual = $scope.materiasx[j];
                    console.log($scope.materiaActual);
                    $scope.nombreActual = $scope.materiaActual.nombre;
                    $scope.nombreActual = $scope.nombreActual.trim();
                    $scope.nombreActual = $scope.nombreActual.toUpperCase();
                    if($scope.materiaBuscada === $scope.nombreActual)
                    {
                        $scope.monitoresresultado.push($scope.todos[i]);
                        $scope.contadorResultados++;
                    }
                    }   
                }
              
            }
        

        for(var i = 0; i<$scope.monitoresresultado.length;i++)
        {   
            $scope.random1={};
            var inter = Math.floor(Math.random() * (5 - 1 + 1)) + 1; 
            console.log(inter);
            if(inter === 1)
            {
                $scope.random1.rdisponibilidad = "DISPONIBLE";
                $scope.random1.rtiempo = "menos de 1 mes";
            }
      
            else if(inter === 2)    
            {
               $scope.random1.rdisponibilidad = "NO DISPONIBLE";
               $scope.random1.rtiempo = "3 meses";
            }
        
            else if(inter === 3)
            {
               $scope.random1.rdisponibilidad = "NO DISPONIBLE";
               $scope.random1.rtiempo = "menos de 1 mes";
            }  
          
            else if(inter === 4)
            {
                $scope.random1.rdisponibilidad = "DISPONIBLE";
               $scope.random1.rtiempo = "2 meses";
            }
          
          $scope.random1.id = i;
          $scope.random1.atendidos = Math.floor(Math.random() * (30 - 0 + 1)) + 0;
          $scope.random1.nombre = $scope.monitoresresultado[i].nombre;
          $scope.random1.precioHora = $scope.monitoresresultado[i].precioHora;
          $scope.resultadosRandom.push($scope.random1);
          
        }
            console.log($scope.resultadosRandom);
            
        })
        
        .error(function(error){
            console.log(error);
        })
        
        
    }
    
    $scope.random = function(randomNumber){
      for(var i = 0; i<randomNumber;i++)
      {
            var inter = Math.floor(Math.random() * (5 - 1 + 1)) + 1; 
            if(inter === 1)
            {
                $scope.random1.rdisponibilidad = "DISPONIBLE";
                $scope.random1.rtiempo = "menos de 1 mes";
            }
      
            else if(i === 2)    
            {
               $scope.random1.rdisponibilidad = "NO DISPONIBLE";
               $scope.random1.rtiempo = "3 meses";
            }
        
            else if(i === 3)
            {
               $scope.random1.rdisponibilidad = "NO DISPONIBLE";
               $scope.random1.rtiempo = "menos de 1 mes";
            }  
          
            else if(i === 4)
            {
                $scope.random1.rdisponibilidad = "DISPONIBLE";
               $scope.random1.rtiempo = "2 meses";
            }
          
          $scope.random1.atendidos = Math.floor(Math.random() * (30 - 0 + 1)) + 0; 
          
      }
  
    }
    
    $scope.registrarse = function()
    {     
          $scope.usuarioNuevo.precioHora= 0;
          $scope.usuarioNuevo.monitor=true;
          $scope.usuarioNuevo.descripcion="d1";
          console.log(JSON.stringify($scope.usuarioNuevo));
          $http.post('http://localhost:9000/estudiante',  JSON.stringify($scope.usuarioNuevo))
           .success(function(data,headers){   
              $scope.usuarioNuevo={};
           })
    }
    
    $scope.iniciarSesion = function()
    {
    console.log($scope.logueo.correo);
       $http.get("http://localhost:9000/estudiantes")
       .success(function(data){
           $scope.estudiantes = data;
           for(var i = 0; $scope.estudiantes.length; i++)
           {  
              $scope.actual = $scope.estudiantes[i];
              console.log($scope.actual);
              if($scope.actual.correo === $scope.logueo.correo)
              {
                  if(window.location.port)
                  {
                            window.location = "http://" + window.location.hostname + ":" + window.location.port + "/usuario.html";
                  }

                  else
                  {
                            window.location = "http://" + window.location.hostname + "/usuario.html";
                  }
              }
           }
           
       })
       
       .error(function(error){
           console.log(error);
       })
    }
    
    $scope.cerrarSesion = function()
    {
          if(window.location.port)
          {
            window.location = "http://" + window.location.hostname + ":" + window.location.port + "/index.html";
          }

          else
          {
            window.location = "http://" + window.location.hostname + "/index.html";
          }
    }
    
    $scope.miperfil = function()
    {
          $scope.watachi=true;
    }
    
    $scope.perfilmonitor = function()
    {
         $scope.monithor=true;
    }
    
    $scope.agendar = function(){
        $scope.tutoriasAgendadas.push($scope.tutoriaAgendada);
        $scope.cantidadTutorias++;
        $scope.tutoriaAgendada = {};
        
    }
  });

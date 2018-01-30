'use strict'

const diaryApp = angular.module('diaryApp', [])

diaryApp.controller('AppCtrl', function($scope,$http) {
    console.log("Hello World from controller!")

    var refresh = ()=>{
        $http({
            method: 'GET',
            url: '/contactlist'
        })
        .then((response,data)=>{
            console.log("I got the data I requested")
            $scope.contactlist=response.data
            $scope.list = {}        
        })
        .catch((err)=>{
            res.send('ERROR!!')
        })
    }

    refresh()
    

    $scope.addContact=()=>{
        console.log($scope.list)
        $http({
            method: 'POST',
            url: '/contactlist',
            data: $scope.list
        })
        .then((response,data)=>{
            console.log(response)
            data=response.data
            refresh()
        })
        .catch((err)=>{
            res.send('ERROR!!')
        })
    }

    $scope.remove=(id)=>{
        console.log(id)
        $http({
            method: 'DELETE',
            url: '/contactlist/'+id
        })
        .then((response,data)=>{
            refresh()
        })
    }

    $scope.edit=(id)=>{
        console.log(id)
        $http({
            method: 'GET',
            url: '/contactlist/'+id
        })
        .then((response,data)=>{
            $scope.list=response.data
        })
    }

    $scope.update=()=>{
        console.log($scope.list._id)
        $http({
            method: 'PUT',
            url: '/contactlist/'+$scope.list._id,
            data: $scope.list
        })
        .then((response,data)=>{
            refresh()
        })
    }

    $scope.clear=()=>{
        $scope.list=""
    }

    


})
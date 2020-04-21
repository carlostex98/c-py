def Main (): 
     ''' 
        #################### Archivo de entrada #1 #################
        ## El objetivo de este archivo es evaluar el manejo   ######
        ## correcto de la tabla de simbolos.                  ######
        ## Los tipos aceptados son:                           ######
        ####### Int
        ####### Float
        ####### Char
        ####### String
        ####### Boolean
         ''' 
     # Declaraciones basicas 
     x ,y,z=520#  x=520 ,y=520 ,z = 520 
      
     x1 ,y1,z1=3.14#  x1 = 3.14, 3.14, 3.14 
      
     x2 ,y2,z2=true#  x2 = true, y2=true, z2= true 
      
     x3 ,y3,z3='x'#  x3='x' , y3='x', z3='x' 
      
     x4 ,y4,z4="CadenaDefecto"#  x4="CadenaDefecto", y4="CadenaDefecto", z4="CadenaDefecto" 
      
     print( ">>>>>>>>> Enteros <<<<<<<<<<<<<<<<") 
     print( "x debe ser 520, segun la tabla de simbolos tiene ["+x+"]") 
     print( "y debe ser 520, segun la tabla de simbolos tiene ["+y+"]") 
     print( "z debe ser 520, segun la tabla de simbolos tiene ["+z+"]") 
     print( ">>>>>>>>> Float  <<<<<<<<<<<<<<<<<") 
     print( "X1 debe ser 3.14, segun la tabla de simbolos tiene ["+x1+"]") 
     print( "y1 debe ser 3.14, segun la tabla de simbolos tiene ["+y1+"]") 
     print( "z1 debe ser 3.14, segun la tabla de simbolos tiene ["+z1+"]") 
     print( ">>>>>>>>> Bool  <<<<<<<<<<<<<<<<<") 
     print( "X2 debe ser true, segun la tabla de simbolos tiene ["+x2+"]") 
     print( "y2 debe ser true, segun la tabla de simbolos tiene ["+y2+"]") 
     print( "z2 debe ser true, segun la tabla de simbolos tiene ["+z2+"]") 
     print( ">>>>>>>>> Char  <<<<<<<<<<<<<<<<<") 
     print( "X3 debe ser x, segun la tabla de simbolos tiene ["+x3+"]") 
     print( "y3 debe ser x, segun la tabla de simbolos tiene ["+y3+"]") 
     print( "z3 debe ser x, segun la tabla de simbolos tiene ["+z3+"]") 
     print( ">>>>>>>>> String  <<<<<<<<<<<<<<<<<") 
     print( "X4 debe ser CadenaDefecto, segun la tabla de simbolos tiene ["+x4+"]") 
     print( "y4 debe ser CadenaDefecto, segun la tabla de simbolos tiene ["+y4+"]") 
     print( "z4 debe ser CadenaDefecto, segun la tabla de simbolos tiene ["+z4+"]") 
     print( "Si funciona todo, hasta el momento tengo 40 pts.") 
     print( "    ") 
     print( "    ") 
     print( "    ") 
     # Asignacion y expresiones aritmeticas........... 
     x=50*2+10/2 
     # 105 
     y=3*3+5-2 
     # 12 
     z=(10*5) - (45/3) + 5 
     # 40 
     print( ">>>>>>>>> Enteros <<<<<<<<<<<<<<<<") 
     print( "x debe ser 105, segun la tabla de simbolos tiene ["+x+"]") 
     print( "y debe ser 12, segun la tabla de simbolos tiene ["+y+"]") 
     print( "z debe ser 40, segun la tabla de simbolos tiene ["+z+"]") 
     x1=3.14*10.20+5.20/2.60 
     # 34.028 
     y1=7.36+(5.12/2.00) - (3.16*2.00) 
     # 3.6 
     z1=5.5+(4.4-2.3) * 0.5 
     # 6.55 
     print( ">>>>>>>>> Float <<<<<<<<<<<<<<<<") 
     print( "X1 debe ser 34.028, segun la tabla de simbolos tiene ["+x1+"]") 
     print( "y1 debe ser 3.6, segun la tabla de simbolos tiene ["+y1+"]") 
     print( "z1 debe ser 6.55, segun la tabla de simbolos tiene ["+z1+"]") 
     x2=true 
     # true 
     y2=false 
     # false 
     z2=2 
     # false 
     print( ">>>>>>>>> Bool  <<<<<<<<<<<<<<<<<") 
     print( "X2 debe ser true, segun la tabla de simbolos tiene ["+x2+"]") 
     print( "y2 debe ser false, segun la tabla de simbolos tiene ["+y2+"]") 
     print( "z2 debe ser false, segun la tabla de simbolos tiene ["+z2+"]") 
     x3='a' 
     y3='b' 
     z3='c' 
     print( ">>>>>>>>> Char  <<<<<<<<<<<<<<<<<") 
     print( "X3 debe ser a, segun la tabla de simbolos tiene ["+x3+"]") 
     print( "y3 debe ser b, segun la tabla de simbolos tiene ["+y3+"]") 
     print( "z3 debe ser c, segun la tabla de simbolos tiene ["+z3+"]") 
     x4="Cadena de prueba" 
     y4="Cadena de prueba" 
     z4="Cadena de prueba" 
     print( ">>>>>>>>> String  <<<<<<<<<<<<<<<<<") 
     print( "X4 debe ser Cadena de prueba 1, segun la tabla de simbolos tiene ["+x4+"]") 
     print( "y4 debe ser Cadena de prueba 2, segun la tabla de simbolos tiene ["+y4+"]") 
     print( "z4 debe ser Cadena de prueba 3, segun la tabla de simbolos tiene ["+z4+"]") 
     print( "Si funciona todo, hasta el momento tengo 70 pts.") 
     print( ">>>>>>>>>>>>>>> CASO #1 <<<<<<<<<<<<<<<<<<<") 
     sueldo =10500.70 
     if (sueldo>3000 ): 
          print( "Esta persona debe abonar impuestos") 
     print( ">>>>>>>>>>>>>>> CASO #2 <<<<<<<<<<<<<<<<<<<") 
     num1 ,num2; 
     num1=10 
     num2=20 
     if (num1>num2 ): 
          print( "Esta mal "+num1) 
     else: 
          print( "Esta bien "+num2) 
     print( ">>>>>>>>>>>>>>> CASO #3 <<<<<<<<<<<<<<<<<<<") 
     nota1 ,nota2,nota3; 
     nota1=8 
     nota2=5 
     nota3=9 
     promedio ; 
     promedio=(nota1+nota2+nota3) / 3 
     if (promedio>=7 ): 
          print( "Promocionado con [7.33]"+promedio) 
     print( ">>>>>>>>>>>>>>> CASO #4 <<<<<<<<<<<<<<<<<<<") 
     num ; 
     num=9 
     if ((num*1)<(10+0) ): 
          print( "Esta bien, Tiene un dígito") 
     else: 
          print( "Esta mal, Tiene dos dígitos") 
     print( "(x+50-10/2)*2= 190 R://") 
if __name__ = "__main__"  
     main() 

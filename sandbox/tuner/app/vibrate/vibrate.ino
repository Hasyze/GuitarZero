/*
  Blink

  Turns an LED on for one second, then off for one second, repeatedly.

  Most Arduinos have an on-board LED you can control. On the UNO, MEGA and ZERO
  it is attached to digital pin 13, on MKR1000 on pin 6. LED_BUILTIN is set to
  the correct LED pin independent of which board is used.
  If you want to know what pin the on-board LED is connected to on your Arduino
  model, check the Technical Specs of your board at:
  https://www.arduino.cc/en/Main/Products

  modified 8 May 2014
  by Scott Fitzgerald
  modified 2 Sep 2016
  by Arturo Guadalupi
  modified 8 Sep 2016
  by Colby Newman

  This example code is in the public domain.

  https://www.arduino.cc/en/Tutorial/BuiltInExamples/Blink
*/

// the setup function runs once when you press reset or power the board
String receivedString = ""; 

void setup() {
  // initialize digital pin LED_BUILTIN as an output.
  pinMode(LED_BUILTIN, OUTPUT);
  Serial.begin(9600);
}

// the loop function runs over and over again forever
void loop() {
  if (Serial.available() > 0) {
    char receivedChar = Serial.read();
    // Si le caractère reçu n'est pas un saut de ligne, ajoutez-le à la chaîne de caractères
    if (receivedChar != '\n') {
      receivedString += receivedChar;
    } else {
      // Si un saut de ligne est reçu, cela signifie la fin de la chaîne de caractères
      // Convertissez la chaîne de caractères en un entier
      int mistake = receivedString.toInt();
      // Faites quelque chose avec l'entier reçu (receivedInt)
      if (mistake){
        digitalWrite(LED_BUILTIN, HIGH);  // turn the LED on (HIGH is the voltage level)
        delay(1000);                      // wait for a second
        digitalWrite(LED_BUILTIN, LOW);   // turn the LED off by making the voltage LOW
        delay(1000); 
      }
      
      // Réinitialisez la chaîne de caractères pour la prochaine lecture
      receivedString = "";
    }
  }


/*  
  if (mistake){
    digitalWrite(11, HIGH);  // turn the LED on (HIGH is the voltage level)
    delay(1000);                      // wait for a second
    digitalWrite(11, LOW);   // turn the LED off by making the voltage LOW
    delay(1000); 
  }
  mistake = (mistake+1)%2;
  */
}

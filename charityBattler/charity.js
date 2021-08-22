class charity 
{
  constructor(name) {
    this.name = name;
    this.wins = 0;
	this.health = 10;
    this.thwackability = Math.random()*.2+.3;
    this.unthwackability = Math.random()*.2+.3;;
    this.shakespearianism = Math.random()*.3+ .6;
    this.coldness = Math.random()*.3+ .6;
    this.moxie = Math.random()*.1 + .2;
    this.musclitude = Math.random()*.1+.2;
  }
  attackChance()
  {
	  return Math.random()+(this.thwackability+this.unthwackability)/10
  }
  attackRoll()
  {
	  return this.thwackability ** (Math.random()+this.musclitude) - Math.random()*this.coldness;
  }
  defendRoll()
  {
	  return this.unthwackability**(Math.random()+this.moxie) - Math.random()*this.shakespearianism;
  }
  buff()
  {
      this.thwackability = this.thwackability+Math.random()*.3-.06;
      this.unthwackability = this.unthwackability+Math.random()*.3-.06;
      this.shakespearianism = this.shakespearianism+Math.random()*.3-.06;
	  this.coldness = this.coldness+Math.random()*.3+.06;
	  this.moxie = this.moxie+Math.random()*.3-.06;
      this.musclitude = this.musclitude+Math.random()*.3-.06;
  }
  nerf()
  {
      this.thwackability = this.thwackability-0.1;
      this.unthwackability = this.unthwackability-0.1;
      this.shakespearianism = this.shakespearianism-0.1;
	  this.coldness = this.coldness-0.1;
	  this.moxie = this.moxie-0.1;
      this.musclitude = this.musclitude-0.1;
  }
  
}
class historian
{
	constructor()
	{
		this.events = [];
	}
	addEvent(event)
	{
		this.events.push(event);
	}
}
class event
{
	constructor(thing1,thing2,description,value)
	{
		this.thing1 = Object.assign({},thing1);
		this.thing2 = Object.assign({},thing2);
		this.description = description;
		this.value = value;
	}
	getString()
	{
		switch (this.description)
		{
			case 'matchup':
				return `New ${this.value}-game series: ${this.thing1.name} vs ${this.thing2.name}`
				break;
			case 'start':
				return `Game ${this.value} in series between ${this.thing1.name} and ${this.thing2.name}`
				break;
			case 'miss':
				return `${this.thing1.name} attacks ${this.thing2.name} and misses!`
				break;
			case 'damage':
				return `${this.thing1.name} attacks ${this.thing2.name} and does ${this.value} damage!`
				break;
			case 'win':
				return `${this.thing1.name} defeats ${this.thing2.name}!`
				break;
			case 'wonseries':
				return `${this.thing1.name} wins the series against ${this.thing2.name}!`
				break;
			case 'eliminated':
				return `${this.thing1.name} has been eliminated from consideration :(`
				break;
			case 'triumph':
				return `${this.thing1.name} has been crowned the ULTIMATE CHAMPION!`
				break;
			case 'buff':
				return `${this.thing1.name} receives a mysterious donation!`
				break;				
		}
	}
}
function battle(charity1,charity2,hist)
{
	while (charity1.health>0 && charity2.health>0)
	{
		if (charity1.attackChance() > charity2.attackChance())
		{
			var damage = charity1.attackRoll() - charity2.defendRoll();
			if( damage > 0)
			{
				hist.addEvent(new event(charity1,charity2,'damage',damage));
				charity2.health = charity2.health-damage;
			}
			else
			{
				hist.addEvent(new event(charity1,charity2,'miss',0));
			}
		}
		else
		{
			var damage = charity2.attackRoll() - charity1.defendRoll();
			if( damage > 0)
			{
				hist.addEvent(new event(charity2,charity1,'damage',damage));
				charity1.health = charity1.health-damage;
			}
			else
			{
				hist.addEvent(new event(charity2,charity1,'miss',0));
			}
			
		}
		// console.log('ch1: '+charity1.health)
		// console.log('ch2: '+charity2.health)
	}
	if (charity1.health>0)
		{charity1.wins = charity1.wins+1;
			hist.addEvent(new event(charity1,charity2,'win',0));
			// charity1.nerf();
			charity2.buff();
			hist.addEvent(new event(charity2,charity1,'buff',0));
		}

	else
		{charity2.wins = charity2.wins+1;
			// charity2.nerf();
			hist.addEvent(new event(charity2,charity1,'win',0));
			charity1.buff();
			hist.addEvent(new event(charity1,charity2,'buff',0));
		}
	
	charity1.health = 10;
	charity2.health = 10;

}
function tournament(allCharities,hist)
{
	//allCharities must have even number of dudes
	while (allCharities.length>1)
	{
		for(var idx=0;idx<allCharities.length/2;idx++)
		{	
			hist.addEvent(new event(allCharities[2*idx],allCharities[2*idx+1],'matchup',21));
			for(var jdx=0;jdx<21;jdx++)
			{
				hist.addEvent(new event(allCharities[2*idx],allCharities[2*idx+1],'start',jdx+1));
				battle(allCharities[2*idx],allCharities[2*idx+1],hist)
			}
			Math.random<.5?console.log(allCharities[2*idx].wins,allCharities[2*idx+1].wins):console.log(allCharities[2*idx+1].wins,allCharities[2*idx].wins);
			
			if (allCharities[2*idx].wins>allCharities[2*idx+1].wins)
			{
				hist.addEvent(new event(allCharities[2*idx],allCharities[2*idx+1],'wonseries',0));
				allCharities[2*idx].wins = 0;
				hist.addEvent(new event(allCharities[2*idx+1],allCharities[2*idx],'eliminated',0));
				allCharities[2*idx+1] = undefined;

			}
			else
			{
				hist.addEvent(new event(allCharities[2*idx+1],allCharities[2*idx],'wonseries',0));
				allCharities[2*idx+1].wins = 0;
				hist.addEvent(new event(allCharities[2*idx],allCharities[2*idx+1],'eliminated',0));
				allCharities[2*idx] = undefined;

			}
		}
		allCharities = allCharities.filter(item => item !== undefined)
		// console.log(allCharities);
	}
	hist.addEvent(new event(allCharities[0],allCharities[0],'triumph',0));
	return allCharities[0];
}

// var referenceTime = 1629577075332;
a = new charity('ACLU');
b = new charity("Child's Play");
c = new charity('Trevor Project');
d = new charity('Nowzad');

var lootcrates = new historian();
var best = tournament([a,b,c,d],lootcrates);
console.log(JSON.stringify(lootcrates));

pub mod wrap;
pub use wrap::*;

pub fn get_animal_name(args: ArgsGetAnimalName) -> String {
    "Cat".to_string()
}

pub fn get_animal_dimensions(args: ArgsGetAnimalDimensions) -> AnimalDimensions {
    match args.size {
        AnimalSize::SMALL => AnimalDimensions {
            height: 4,
            length: 6,
            width: 2
        },
        AnimalSize::MEDIUM => AnimalDimensions {
            height: 6,
            length: 10,
            width: 3
        },
        AnimalSize::LARGE => AnimalDimensions {
            height: 12,
            length: 15,
            width: 6
        },
        _ => panic!("Unknown size.")
    }
}

pub fn get_animal_velocity(args: ArgsGetAnimalVelocity) -> u32 {
    match args.size {
        AnimalSize::SMALL => 1,
        AnimalSize::MEDIUM => 3,
        AnimalSize::LARGE => 5,
        _ => panic!("Unknown size")
    }
}

pub fn speak(args: ArgsSpeak) -> String {
    "meow, meow!".to_string()
}

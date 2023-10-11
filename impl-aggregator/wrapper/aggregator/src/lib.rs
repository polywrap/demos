pub mod wrap;
pub use wrap::*;

pub fn get_animals(args: ArgsGetAnimals) -> Vec<String> {
    [
        "wrap://ens/cat.impls.animals.eth".to_string(),
        "wrap://ens/dog.impls.animals.eth".to_string()
    ].to_vec()
}

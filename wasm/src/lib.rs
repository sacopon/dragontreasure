use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    pub fn jsConsoleLog(s: &str);
    pub fn jsPrintPixiText(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    jsConsoleLog(&format!("Hello, {}! from Rust", name));
}

#[wasm_bindgen]
pub fn greet_to_pixi(name: &str) {
    jsPrintPixiText(&format!("Hello, {}! from Rust!", name));
}

pub fn add(left: usize, right: usize) -> usize {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}

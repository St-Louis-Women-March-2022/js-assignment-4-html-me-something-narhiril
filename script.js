function main() {

    const canvas = document.getElementById('cardRenderWindow');
    const gl = canvas.getContext('webgl');

    if (!gl) {
        document.querySelectorAll('.render').forEach((element) => { element.style.display = "none"; });
        alert('WebGL content unavailable - your browser or device may not support it.');
        return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    const renderer = new THREE.WebGLRenderer({canvas: cardRenderWindow});
    const scene = new THREE.Scene();

    function assignMaterial(texture){
        return new THREE.MeshLambertMaterial({map: texture});
    }

    function prepareCardTextures(renderObj){
        const texLoader = new THREE.TextureLoader();
        const texObj = {
            front: texLoader.load("./images/mockup-front.png"),
            back: texLoader.load("./images/cardback-texture.png")
        };
        for (const prop in texObj){
            texObj[prop].anisotropy = renderObj.capabilities.getMaxAnisotropy();
            texObj[prop] = assignMaterial(texObj[prop]);
        }
        return texObj;
    }

    const texMats = prepareCardTextures(renderer);
    const materials = [
        new THREE.MeshStandardMaterial({ color: "#ffffff" }),
        new THREE.MeshStandardMaterial({ color: "#ffffff" }),
        new THREE.MeshStandardMaterial({ color: "#ffffff" }),
        new THREE.MeshStandardMaterial({ color: "#ffffff" }),
        texMats.front,
        texMats.back
        ];
    const card = new THREE.Mesh(new THREE.BoxGeometry(3.056, 5.444, 0.025), materials); //aspect ratio of front texture
    const camera = new THREE.PerspectiveCamera(50, canvas.width / canvas.height, 0.01, 500);
    const lightSource = new THREE.PointLight("#e3e3e3", 1.25);
    const ambient = new THREE.AmbientLight("#343434", 0.1);
    scene.add(card);
    scene.add(lightSource);
    scene.add(ambient);
    camera.position.z = 7; 
    lightSource.position.set(camera.position.x + 2, camera.position.y + 1, camera.position.z + 0.5);

    
    function animate(){
        window.requestAnimationFrame(animate);
        card.rotation.z += 0.00075;
        card.rotation.y += 0.006;
        renderer.render(scene, camera);
    }

    animate();

}


//window.addEventListener('load', main);
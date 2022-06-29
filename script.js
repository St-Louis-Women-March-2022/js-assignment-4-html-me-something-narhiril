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

    const texLoader = new THREE.TextureLoader();
    const materials = [
        new THREE.MeshStandardMaterial({ color: "#ffffff" }),
        new THREE.MeshStandardMaterial({ color: "#ffffff" }),
        new THREE.MeshStandardMaterial({ color: "#ffffff" }),
        new THREE.MeshStandardMaterial({ color: "#ffffff" }),
        new THREE.MeshLambertMaterial({ map: texLoader.load("./images/mockup_front.png") }),
        new THREE.MeshLambertMaterial({ map: texLoader.load("./images/cardback-texture.png") })
                ]
    const card = new THREE.Mesh(new THREE.BoxGeometry(3.5, 6.5, 0.025), materials);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.01, 500);
    const renderer = new THREE.WebGLRenderer({canvas: cardRenderWindow});
    const lightSource = new THREE.PointLight("#e3e3e3", 1.25);
    const ambient = new THREE.AmbientLight("#344434", 1.0);
    scene.add(card);
    scene.add(lightSource);
    scene.add(ambient);
    camera.position.z = 5; 
    lightSource.position.set(camera.position.x + 2, camera.position.y + 1, camera.position.z + 0.5);

    
    function animate(){
        window.requestAnimationFrame(animate);
        card.rotation.z += 0.0012;
        card.rotation.y += 0.006;
        renderer.render(scene, camera);
    }

    animate();

}


window.addEventListener('load', main);